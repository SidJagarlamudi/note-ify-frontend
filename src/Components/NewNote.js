import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { fetchNotesSuccess } from "../actions/notes";
import { Link } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Blob from "./Blob.js"

class NewNote extends React.Component {
  constructor() {
    super();
    this.state = {
      note: {
        title: "",
        content: "",
        user_id: 1,
      },
    };
  }

  handleTitle = (event) => {
    this.setState({
      note: {
        title: event.target.value,
        content: this.state.note.content,
        user_id: this.props.auth,
      },
    });
  };

  handleContent = (event) => {
    this.setState({
      note: {
        title: this.state.note.title,
        content: event.target.value,
        user_id: this.props.auth,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    };

    fetch(`http://localhost:3000/users/${this.props.auth}/notes`, reqObj)
      .then((resp) => resp.json())
      .then(() => this.props.history.push("/home"));
  };

  render() {
    console.log(this.props)
    return (
      <div style={{ backgroundColor: 'white', height: 1000}}>
      <Grid container direction="column" justify="center" alignItems="center" >
      <Blob />
        <ValidatorForm onSubmit={this.handleSubmit} style={{ marginTop: 125 }}>
          <div>
            <TextValidator
              style={{ margin: 10 }}
              id="outlined-textarea"
              label="Title..."
              value={this.state.note.title}
              multiline
              variant="outlined"
              onChange={this.handleTitle}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </div>

          <TextValidator
            style={{ margin: 10 }}
            id="outlined-multiline-static"
            label="Content..."
            multiline
            rows={10}
            value={this.state.note.content}
            variant="outlined"
            onChange={this.handleContent}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <div style={{ align: "center" }}>
            <Button
              component={Link}
              to={`/home`}
              variant="contained"
              type="submit"
              style={{ backgroundColor: "#7c43bd", color: "white", margin: 10 }}
              type="submit"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: "#7c43bd", color: "white" }}
              type="submit"
            >
              Write Note
            </Button>
          </div>
        </ValidatorForm>
      </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
   auth: state.auth.id
  }
}

export default connect(mapStateToProps)(NewNote);
