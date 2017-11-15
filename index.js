let SerialPort = require("serialport");
let Buffer = require("buffer").Buffer;
let argumentsHelper = require("./helpers/arguments.js");
let commands = require("./commands.js");
let flags = require("./flags.js");

let devicePath = "";

userArgs = argumentsHelper.userArgs();

// Find the device path
SerialPort.list(function(err, results) {
  if (err) {
    throw err;
  }

  var device = results.find(device => {
    return device.manufacturer == "Prolific Technology Inc. ";
  });

  if (device) {
    devicePath = device.comName;
    //console.log("Listening on " + devicePath);
  }
})
  // Run the actual program
  .then(function() {
    var port = new SerialPort(devicePath, {
      baudRate: 57600
    });

    const parser = port.pipe(
      new SerialPort.parsers.ByteLength({
        length: userArgs.command.replyLength
      })
    );

    parser.on("data", data => {
      data = data.toJSON().data;
      // get only data
      data.splice(0, 3);
      data.splice(-1, 1);

      console.log(JSON.stringify(data));

      process.exit();
    });

    let send;
    if (userArgs.more !== false) {
      send = makeReadCommand(userArgs.command, userArgs.flag.code, 0x02, 0x0000);
    } else {
      send = makeReadCommand(userArgs.command, userArgs.flag.code);
    }

    port.write(send, function(err) {
      if (err) {
        return console.log("Error on write: ", err.message);
      }
    });

    // Open errors will be emitted as an error event
    port.on("error", function(err) {
      console.log("Error: ", err.message);
    });
  });

function makeReadCommand(command, ...data) {
  let params = [command.code, ...data];

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
  params.push(
    ~parseInt(
      params.reduce((a, b) => {
        return a + b;
      }, 0)
    ) + 1
  );
  console.log(params);

  let buffer = new Uint16Array(params);

  return Buffer.from(buffer);
}
