import React from "react";
import Select from "react-select";
import API from "../../utils/common";
export default class MultipleSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      countries: [],
      selectedSkill: null,
      selectedCountry: null
    };
  }
  handleChange = (selectedOption, type) => {
    // console.log(selectedOption);
    // console.log("OnChange : " + type);
    if (selectedOption && type) {
      this.setState({ selectedSkill: selectedOption });
      // console.log(`Option selected:`, selectedOption);
    } else if (selectedOption) {
      this.setState({ selectedCountry: selectedOption });
    }
    this.props.getDetails(this.state);
  };
  onInputChange = (e, type) => {
    // console.log(e);
    // console.log(type);
    const self = this;
    let skillsList = [];
    if (e && type) {
      API.getSkillsOrCountry("api/skills?q=" + e).then(function(Json) {
        const { skills } = Json;
        skills.map(value => skillsList.push({ value, label: value }));
        self.setState({
          skills: skillsList
        });
      });
    } else if (e) {
      API.getSkillsOrCountry("api/countries?q=" + e).then(function(Json) {
        const { countries } = Json;
        countries.map(value => skillsList.push({ value, label: value }));
        self.setState({
          countries: skillsList
        });
      });
    }
    this.props.getDetails(this.state);
  };
  render() {
    const { selectedOption } = this.state;
    //console.log(this.state);
    return (
      <Select
        value={
          this.props.multiple
            ? this.state.selectedSkill
            : this.state.selectedCountry
        }
        isMulti={this.props.multiple}
        isSearchable
        onChange={(value, isMulti) =>
          this.handleChange(value, this.props.multiple)
        }
        onInputChange={(value, isMulti) =>
          this.onInputChange(value, this.props.multiple)
        }
        options={this.props.multiple ? this.state.skills : this.state.countries}
        placeholder={
          this.props.multiple ? "Search for Skills" : "Search for Country"
        }
      />
    );
  }
}
