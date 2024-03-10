import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-canvas-mock";

Enzyme.configure({ adapter: new Adapter() });
