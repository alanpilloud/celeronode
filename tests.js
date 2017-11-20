var assert = require("assert"),
  should = require("chai").should,
  { exec } = require("child_process");

function captureExec(command, done) {
  exec(command, function(error, stdout, stderr) {
    if (error) done(error); // Handle errors.
    done();
    return JSON.parse(stdout);
  });
}

describe("commands", function() {
  describe("start", function() {
    var captured_stdout;

    before(function(done) {
      exec("node ./index.js -c start", function(error, stdout, stderr) {
        if (error) done(error); // Handle errors.
        captured_stdout = JSON.parse(stdout);
        console.log(captured_stdout);
        done();
      });
    });

    it.skip("should have a valid checksum", function() {
      assert.equal(captured_stdout.isChecksumValid, true);
    });

    it("should have a valid acknowledgement", function() {
      assert.equal(captured_stdout.isRequestAcknowledged, true);
    });
  });

  describe("write Int32 value", function() {
    var captured_stdout;

    before(function(done) {
      exec("node ./index.js -c writeValue -f referenceSpeed -v 400", function(error, stdout, stderr) {
        if (error) done(error); // Handle errors.
        captured_stdout = JSON.parse(stdout);
        console.log(captured_stdout);
        done();
      });
    });

    it.skip("should have a valid checksum", function() {
      assert.equal(captured_stdout.isChecksumValid, true);
    });

    it("should have a valid acknowledgement", function() {
      assert.equal(captured_stdout.isRequestAcknowledged, true);
    });
  });

  describe("stop", function() {
    var captured_stdout;

    before(function(done) {
      exec("node ./index.js -c stop", function(error, stdout, stderr) {
        if (error) done(error); // Handle errors.
        captured_stdout = JSON.parse(stdout);
        done();
      });
    });

    it.skip("should have a valid checksum", function() {
      assert.equal(captured_stdout.isChecksumValid, true);
    });

    it("should have a valid acknowledgement", function() {
      assert.equal(captured_stdout.isRequestAcknowledged, true);
    });
  });
});

describe("parameters", function() {});
