let SerialPort = require("serialport");
let Buffer = require("buffer").Buffer;
let argumentsHelper = require("./helpers/arguments.js");
let responseFormat = require("./helpers/responseFormat.js");
let commands = require("./commands.js");
let flags = require("./flags.js");
let types = require("./types.js");

let devicePath = "";

userArgs = argumentsHelper.userArgs();

// Find the device path
SerialPort.list(function(err, results) {
  if (err) {
    throw err;
  }

  console.log(results);

  var device = results.find(device => {
    return device.manufacturer == "Prolific Technology Inc. ";
  });

  if (device) {
    devicePath = device.comName;
  }
})
  // Run the actual program
  .then(function() {
    var port = new SerialPort(devicePath, {
      baudRate: 57600
    });

    //                                 _
    //  _ __ ___  __ _ _   _  ___  ___| |_
    // | '__/ _ \/ _` | | | |/ _ \/ __| __|
    // | | |  __/ (_| | |_| |  __/\__ \ |_
    // |_|  \___|\__, |\__,_|\___||___/\__|
    //              |_|
    //
    let send = makeCommand(userArgs.command, userArgs.data);

    port.write(send, function(err) {
      if (err) {
        return console.log("Error on write: ", err.message);
      }
    });

    //  _ __ ___  ___ _ __   ___  _ __  ___  ___
    // | '__/ _ \/ __| '_ \ / _ \| '_ \/ __|/ _ \
    // | | |  __/\__ \ |_) | (_) | | | \__ \  __/
    // |_|  \___||___/ .__/ \___/|_| |_|___/\___|
    //               |_|
    //
    const parser = port.pipe(
      new SerialPort.parsers.ByteLength({
        length: userArgs.command.replyLength
      })
    );

    port.on("data", response => {
      data = response.toJSON().data;
      console.log(data);
    });

    parser.on("data", response => {
      data = response.toJSON().data;
      console.log(data);

      responseState = {
        isChecksumValid: false,
        isRequestAcknowledged: false
      };

      if (getChecksum(data.slice(0, -1)) === data[data.length - 1]) {
        responseState.isChecksumValid = true;
      }

      if (isRequestAcknowledged(data)) {
        responseState.isRequestAcknowledged = true;
      }

      // get only data
      data.splice(0, userArgs.command.skipFirstXBytes);
      data.splice(-1, 1);

      if (userArgs.commandName == "readValue") {
        // get type
        var typeByte = data.shift();
        var type = Object.keys(types)[Object.values(types).indexOf(typeByte)];
        var on32 = (data[0] << 32) + data[1];
      }

      console.log(JSON.stringify(responseFormat[userArgs.commandName](responseState, data)));

      process.exit();
    });

    // Open errors will be emitted as an error event
    port.on("error", function(err) {
      console.log("Error: ", err.message);
    });
  });

function reverse(x) {
  x = ((x & 0xaaaaaaaa) >> 1) | ((x & 0x55555555) << 1);
  x = ((x & 0xcccccccc) >> 2) | ((x & 0x33333333) << 2);
  x = ((x & 0xf0f0f0f0) >> 4) | ((x & 0x0f0f0f0f) << 4);
  x = ((x & 0xff00ff00) >> 8) | ((x & 0x00ff00ff) << 8);
  return (x >> 16) | (x << 16);
}
function makeCommand(command, params) {
  // we might need to fill with zeroes
  // we need to susbract one because requestLength does include the checksum
  if (command.requestLength - 1 > params.length) {
    let spacesLeft = command.requestLength - 1 - params.length;
    while (spacesLeft > 0) {
      params.push(0);
      spacesLeft--;
    }
  }

  // set length of the package
  params.unshift(params.length + 1);

  // calculate checksum
  params.push(getChecksum(params));

  let buffer = new Int16Array(params);

  console.log(buffer);

  return Buffer.from(buffer);
}

function getChecksum(data) {
  return (
    ~parseInt(
      data.reduce((a, b) => {
        return a + b;
      }, 0)
    ) + 1
  );
}

function swap16(val) {
  return ((val & 0xff) << 8) | ((val >> 8) & 0xff);
}

function swap32(src) {
  return (
    ((src & 0xff000000) >> 24) | ((src & 0x00ff0000) >> 8) | ((src & 0x0000ff00) << 8) | ((src & 0x000000ff) << 24)
  );
}

function isRequestAcknowledged(data) {
  if (data[1] === userArgs.command.code) {
    return true;
  } else if (data[1] === ~userArgs.command.code) {
    return false;
  }

  return false;
}
