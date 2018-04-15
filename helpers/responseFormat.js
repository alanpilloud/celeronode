module.exports = {
  start: function(state, data) {
    return Object.assign({
      command: state.command.commandName,
      data
    });
  },

  stop: function(state, data) {
    return Object.assign({
      command: state.command.commandName,
      data
    });
  },

  readValue: function(state, data, type) {
    let buffer = new Uint8Array(data).buffer;
    let value;

    switch (type) {
      case "Int16":
        value = new Int16Array(buffer)[0];
        break;

      case "Uint16":
        value = new Uint16Array(buffer)[0];
        break;

      case "Int32":
        value = new Int32Array(buffer)[0];
        break;

      case "Uint32":
        value = new Uint32Array(buffer)[0];
        break;

      case "Float":
        value = new Float32Array(buffer)[0];
        break;
    }

    return Object.assign({
      command: state.command.commandName,
      flag: state.command.flag.name,
      value
    });
  },

  writeValue: function(state, data, type) {
    let value = data.reduce((a, b) => a | b, 0);
    return Object.assign({
      state,
      data,
      value
    });
  }
};
