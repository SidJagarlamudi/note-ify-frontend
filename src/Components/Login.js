import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { loginSuccess } from "../actions/auth";
import { connect } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Bird from "./Bird.js"

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleUserName = (event) => {
    this.setState({
      username: event.target.value,
      password: this.state.password,
    });
  };

  handlePassword = (event) => {
    this.setState({
      username: this.state.username,
      password: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const reqObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    };

    fetch("http://localhost:3000/api/v1/auth", reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          this.props.loginSuccess(data);
          this.props.history.push("/home");
        }
      });
  };
  render() {
    
    return (
      <div style={{ backgroundColor: 'white', height: 1000 }}>
      <Grid container direction="column" justify="right" alignItems="right" >
      
        <Typography
          variant="h1"
          component="h2"
          gutterBottom
          style={{ color: "#7c43bd", marginTop: 150 }}
        >
          NOTE-IFY
        </Typography>
        
        <ValidatorForm onSubmit={this.handleSubmit} style={{ marginTop: 50 }}>
          <TextValidator
            style={{ margin: 10 }}
            id="outlined-textarea"
            label="Username"
            value={this.state.username}
            multiline
            variant="outlined"
            onChange={this.handleUserName}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          <TextValidator
            style={{ margin: 10, left: 5 }}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            value={this.state.password}
            onChange={this.handlePassword}
            validators={["required"]}
            errorMessages={["this field is required", "username is not valid"]}
          />
<Bird />
          <Button
            variant="contained"
            style={{
              backgroundColor: "#7c43bd",
              color: "white",
              padding: 10,
              marginLeft: 30,
              marginTop: 40,
            }}
            type="submit"
          >
            LOGIN
          </Button>
          
          <Button
            component={Link}
            to={`/signup`}
            variant="contained"
            style={{
              backgroundColor: "#ff5c8d",
              color: "white",
              padding: 10,
              marginLeft: 10,
              marginTop: 40,
            }}
          >
            SIGN UP
          </Button>
        </ValidatorForm>
        
      </Grid>
      </div>
    );
  }
}
const mapDispatchToProps = {
  loginSuccess,
};

export default connect(null, mapDispatchToProps)(Login);
