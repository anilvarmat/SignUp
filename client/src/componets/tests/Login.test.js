import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Login from "../Login";
configure({ adapter: new Adapter() });
describe("message box", () => {
  let onChange;
  const props = {
    classes: {}
  };
  onChange = jest.fn();
  const wrapper = shallow(<Login {...props} onChange={onChange} />);
  it("to match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  xit("should respond to change event and change the state of the DeleteOperation Component", () => {
    console.log(wrapper);
    wrapper.find(FormControl).find(InputLabel).find(Input).simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
});
