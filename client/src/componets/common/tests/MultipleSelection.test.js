import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, configure } from "enzyme";
import Select from "react-select";
import MultipleSelection from "../MultipleSelection";
configure({ adapter: new Adapter() });
describe("message box", () => {
    let onChange;
    const props = {
        classes: {},
        getDetails: jest.fn(),
        multiple: {},
    };
    onChange = jest.fn();
    const wrapper = shallow(<MultipleSelection {...props} onChange={onChange} />);
    it("to match snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });
    xit("should respond to change event and change the state of the MultipleSelection Component", () => {
        console.log(wrapper.find(Select));
        wrapper.find(Select).simulate('change', { target: { value: 'Ja' } });
        expect(onChange).toHaveBeenCalled();
    });
});
