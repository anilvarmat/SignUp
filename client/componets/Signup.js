import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import MultipleSelection from "./common/MultipleSelection";
import TextField from "@material-ui/core/TextField";
import API from "../utils/common";
import { Link } from "react-router-dom";
const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    // marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    backgroundColor: "#FFF"
  }
});
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      date: "",
      selectedCountry: [],
      selectedSkill: []
    };
  }
  getDetails = value => {
    console.log(value);
    const { selectedCountry, selectedSkill } = value;
    if (selectedCountry && selectedCountry.value) {
      this.setState({ selectedCountry });
    } else if (selectedSkill) {
      this.setState({ selectedSkill });
    }
  };
  onChange(e) {
    console.log(e.currentTarget);
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }
  handleClick = e => {
    e.preventDefault();
    const {
      username,
      email,
      firstname,
      lastname,
      date,
      password,
      selectedCountry,
      selectedSkill
    } = this.state;
    if (
      username &&
      email &&
      firstname &&
      date &&
      password &&
      selectedCountry.value &&
      selectedSkill.length
    ) {
      //API Call
      this.setState({ loader: true });
      const self = this;
      API.saveUser("api/saveUser", {
        username,
        email,
        firstname,
        lastname,
        dob: date,
        password,
        country: selectedCountry,
        skills: selectedSkill
      }).then(function(Json) {
        console.log(Json);
        self.setState({ loader: false, Redirect: true });
        localStorage.setItem("signedin", true);
        localStorage.setItem("username", username ? username : email);
      });
    } else {
      alert("Required fields are missing");
      console.log("Required Feilds are missing");
      this.setState({ errorMessage: true, loader: false });
    }
  };
  render() {
    const { classes } = this.props;
    console.log(this.state);
    return (
      <main className={classes.main}>
        <div style={{ marginTop: "64px", marginBottom: "8px" }}>
          <Button variant="contained" className={classes.button}>
            <Link to="/" style={{ color: "#333", textDecoration: "none" }}>
              Sign Up{" "}
            </Link>
          </Button>
          <Button variant="contained" className={classes.button}>
            <Link to="/login" style={{ color: "#333", textDecoration: "none" }}>
              Sign In{" "}
            </Link>
          </Button>
        </div>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                value={this.state.username}
                onChange={name => this.onChange(name)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={this.state.email}
                onChange={name => this.onChange(name)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">First Name</InputLabel>
              <Input
                id="firstname"
                name="firstname"
                autoComplete="firstname"
                autoFocus
                value={this.state.firstname}
                onChange={name => this.onChange(name)}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email">Last Name</InputLabel>
              <Input
                id="lastname"
                name="lastname"
                autoComplete="lastname"
                autoFocus
                value={this.state.lastname}
                onChange={name => this.onChange(name)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="date"
                label="Birthday"
                type="date"
                name="date"
                //defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                value={this.state.date}
                autoFocus
                fullWidth
                onChange={name => this.onChange(name)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={name => this.onChange(name)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Skills</InputLabel>
              <MultipleSelection
                multiple={false}
                getDetails={this.getDetails}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Country</InputLabel>
              <MultipleSelection multiple getDetails={this.getDetails} />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleClick}
              disabled={this.state.loader}
            >
              Register
            </Button>
          </form>
          {this.state.Redirect ? <Redirect to="/userprofile" /> : ""}
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
