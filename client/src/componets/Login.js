import React from "react";
import PropTypes from "prop-types";
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
import { Redirect } from "react-router";
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
  button: {
    backgroundColor: "#fff"
  },
  paper: {
    //marginTop: theme.spacing.unit * 8,
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
  }
});
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loader: false,
      loginSuccess: false,
      Redirect: false
    };
  }
  onChange(e) {
    console.log(e.currentTarget);
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }
  handleClick = e => {
    e.preventDefault();
    const { password, username } = this.state;
    if (password && username) {
      //API Call
      this.setState({ loader: true, loginSuccess: false });
      const self = this;
      API.saveUser("api/login", {
        username,
        password
      })
        .then(function (Json) {
          console.log(Json);
          self.setState({ loader: false, loginSuccess: true, Redirect: true });
          localStorage.setItem("signedin", true);
          localStorage.setItem("username", username);
        })
        .catch(function (err) {
          self.setState({ loader: false, loginSuccess: false });
        });
    } else {
      alert("Required fields are missing");
      console.log("Required Feilds are missing");
      this.setState({ errorMessage: true, loader: false });
    }
  };
  render() {
    const { classes } = this.props;
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
            Sign In
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleClick}
              disabled={this.state.loader}
            >
              Sign In
            </Button>
          </form>
          {this.state.Redirect ? <Redirect to="/userprofile" /> : ""}
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
