import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Layout from "../Layout";
configure({ adapter: new Adapter() });
describe("message box", () => {
    const props = {
        classes: {},
    };
    const wrapper = shallow(<Layout {...props} />);
    it("to match snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });
});
