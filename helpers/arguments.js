let commands = require("../commands.js");
let flags = require("../flags.js");
let types = require("../types.js");
const commandLineArgs = require("command-line-args");

module.exports = {
  userArgs: function() {
    const optionDefinitions = [
      { name: "command", alias: "c" },
      { name: "flag", alias: "f" },
      { name: "value", alias: "v" }
    ];

    const options = commandLineArgs(optionDefinitions);

    if (!options.hasOwnProperty("command")) {
      console.log("Missing required --command argument");
      process.exit(1);
    }

    let data = [];
    let flag = [];

    let command = commands[options.command];

    if (typeof command === "undefined") {
      console.log("Unknown command name. Use one of :\n\n" + Object.keys(commands).join("\n"));
      process.exit(1);
    }

    data.push(command.code);

    // if the command needs a flag, has it been provided ?
    if (command.requireFlag === true) {
      if (!options.hasOwnProperty("flag")) {
        console.log(options.command + " requires a --flag argument.");
        process.exit(1);
      }

      flag = flags[options.flag];

      if (typeof flag === "undefined") {
        console.log("Unknown flag name. Use one of :\n\n " + Object.keys(flags).join("\n"));
        process.exit(1);
      }

      data.push(flag.code);
    }

    // if the command needs a type, try to find it
    if (command.requireType === true) {
      var type = types[flag.type];
      if (typeof type === "undefined") {
        console.log("Unknown type. This is an issue in the program, please contact the vendor.");
        process.exit(1);
      }
      data.push(parseInt(type));
    }

    // if the command needs a value, has it been provided ?
    if (command.requireValue === true) {
      if (!options.hasOwnProperty("value")) {
        console.log(options.command + " requires a --value argument.");
        process.exit(1);
      }

      let buffer;

      switch (flag.type) {
        case "Int16":
        case "Uint16":
          buffer = toBytesInt16(options.value);
          break;

        case "Int32":
        case "Uint32":
        case "Float":
          buffer = toBytesInt32(options.value).reverse();
          break;
      }
      data.push(...buffer);
    }

    return {
      commandName: options.command,
      command,
      flag,
      data
    };
  }
};

function toBytesInt16(num) {
  let b = new ArrayBuffer(2);
  new DataView(b).setUint16(0, num);
  return Array.from(new Uint8Array(b));
}

function toBytesInt32(num) {
  let b = new ArrayBuffer(4);
  new DataView(b).setInt32(0, num);
  return Array.from(new Int8Array(b));
}
