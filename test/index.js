import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "../src/stylesheets/datepicker.scss";

Enzyme.configure({ adapter: new Adapter() });

const context = require.context(".", true, /_test$/);
context.keys().forEach(context);
