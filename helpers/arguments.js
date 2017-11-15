let commands = require("../commands.js");
let flags = require("../flags.js");

module.exports = {
  userArgs: function() {
    if (typeof process.argv[2] === "undefined") {
      console.log("Missing first argument (command)");
      process.exit(1);
    }

    let userCommand = process.argv[2];
    let command = commands[userCommand];

    if (typeof command === "undefined") {
      console.log("Unknown command name. Use one of " + Object.keys(commands).join(", "));
      process.exit(1);
    }

    // if the command needs a flag, has it been provided ?
    if (command.requireFlag === true && typeof process.argv[3] === "undefined") {
      console.log(userCommand + " requires a flag argument. Use one of " + Object.keys(flags).join(", "));
      process.exit(1);
    }

    let userFlag = process.argv[3];
    let flag = flags[userFlag];

    if (typeof flag === "undefined") {
      console.log("Unknown flag name. Use one of " + Object.keys(flags).join(", "));
      process.exit(1);
    }

    let userValue = process.argv[4];
    let more = false;
    if (typeof userValue !== "undefined") {
      more = parseInt(userValue);
    }

    return {
      command,
      flag,
      more
    };
  }
};
