import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Signup from "../Signup";
configure({ adapter: new Adapter() });
describe("message box", () => {
  let onChange;
  const props = {
    classes: {}
  };
  onChange = jest.fn();
  const wrapper = shallow(<Signup {...props} onChange={onChange} />);
  it("to match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
