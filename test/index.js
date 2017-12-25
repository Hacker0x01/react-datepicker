const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });

var context = require.context(".", true, /_test$/);
context.keys().forEach(context);
