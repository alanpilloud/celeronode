module.exports = {
  start: function(state, data) {
    return Object.assign({
      state,
      data
    });
  },

  readValue: function(state, data) {
    console.log(data);
    value = data.reduce((a, b) => a | b, 0);
    return Object.assign({
      state,
      data,
      value
    });
  }
};
