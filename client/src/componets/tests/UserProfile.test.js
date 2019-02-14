import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, configure } from "enzyme";
import UserProfile from "../UserProfile";
configure({ adapter: new Adapter() });
describe("message box", () => {
    let onClick;
    const props = {
        classes: {}
    };
    onClick = jest.fn();
    const wrapper = shallow(<UserProfile {...props} />);
    it("to match snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });
    xit("to cal Methods", () => {
        const spy = jest.spyOn(UserProfile.prototype, 'onClick');
        wrapper.instance().methodName();
        expect(spy).toHaveBeenCalled();
    });
});
