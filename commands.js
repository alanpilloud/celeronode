/*
 * code: the code of the command
 * requestLength: the number of bytes that the package must contain, minus the length byte
 * replyLength: the number of bytes that the package must contain, including the length byte
 * skipFirstXBytes: masks the non-data bytes (length, command, etc.) for a more user-friendly usage
 * requireFlag: this command needs to be used with a flag
 * requireType: this command needs to be used with a type of variable
 * requireValue: this command needs to be used with a value
 */
let commands = {
  getStatus: {
    code: 0x00,
    requestLength: 0x00,
    requestCheckSum: 0xfe,
    replyLength: 0x05,
    skipFirstXBytes: 2,
    requireFlag: false,
    requireType: false,
    requireValue: false
  },
  ackError: {
    code: 0x01,
    requestLength: 0x0a,
    requestCheckSum: 0xfd,
    replyLength: 0x03,
    skipFirstXBytes: 2,
    requireFlag: false,
    requireType: false,
    requireValue: true
  },
  readValue: {
    code: 0x04,
    requestLength: 0x03,
    replyLength: 0x08,
    skipFirstXBytes: 2,
    requireFlag: true,
    requireType: false,
    requireValue: false
  },
  writeValue: {
    code: 0x05,
    requestLength: 0x08,
    replyLength: 0x03,
    skipFirstXBytes: 3,
    requireFlag: true,
    requireType: true,
    requireValue: true
  },
  start: {
    code: 0x02,
    requestLength: 0x02,
    requestCheckSum: 0xfc,
    replyLength: 0x03,
    skipFirstXBytes: 0,
    requireFlag: false,
    requireType: false,
    requireValue: false
  },
  stop: {
    code: 0x03,
    requestLength: 0x02,
    requestCheckSum: 0xfb,
    replyLength: 0x03,
    skipFirstXBytes: 0,
    requireFlag: false,
    requireType: false,
    requireValue: false
  }
};

module.exports = commands;
