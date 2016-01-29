var util = require("util");

var consoleWarn = console.warn;
var consoleError = console.error;

function logToError() {
  throw new Error(util.format.apply(this, arguments));
}

beforeEach(function() {
  console.warn = logToError;
  console.error = logToError;
});

afterEach(function() {
  console.warn = consoleWarn;
  console.error = consoleError;
});

var context = require.context(".", true, /_test$/);
context.keys().forEach(context);
