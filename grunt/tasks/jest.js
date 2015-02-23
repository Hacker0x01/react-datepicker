module.exports = function(grunt) {
  require('jest-cli').runCLI(this.options(), process.cwd(), this.async());
};
