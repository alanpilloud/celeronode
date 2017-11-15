let commands = {
  getStatus: {
    code: 0x00,
    requestLength: 0x02,
    replyLength: 0x04,
    requireFlag: false
  },
  readValue: {
    code: 0x04,
    requestLength: 0x03,
    replyLength: 0x08,
    requireFlag: true
  },
  writeValue: {
    code: 0x05,
    requestLength: 0x08,
    replyLength: 0x03,
    requireFlag: true
  }
};

module.exports = commands;
