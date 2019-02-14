import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import API from "../utils/common";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      dob: "",
      skills: null,
      country: ""
    };
  }
  componentDidMount() {
    const username = localStorage.getItem("username");
    if (username) {
      const self = this;
      API.getUserDetails("api/userProfile", {
        username
      })
        .then(function(Json) {
          console.log(Json);
          const {
            email,
            username,
            firstname,
            lastname,
            dob,
            skills,
            country
          } = Json.data;
          self.setState({
            username,
            email,
            firstname,
            lastname,
            dob,
            skills,
            country
          });
        })
        .catch(function(err) {
          self.setState({
            username: "",
            email: "",
            firstname: "",
            lastname: "",
            dob: "",
            skills: null,
            country: ""
          });
        });
    }
  }
  onClick = () => {
    localStorage.removeItem("signedin");
  };
  render() {
    const { classes } = this.props;
    const userDetails = this.state;
    console.log(this.state);
    return (
      <div>
        <Link to="/login" onClick={this.onClick}>
          Logout
        </Link>
        <List className={classes.root}>
          {Object.keys(userDetails).map(val => (
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={val.toUpperCase()}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {userDetails[val]}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserProfile);
