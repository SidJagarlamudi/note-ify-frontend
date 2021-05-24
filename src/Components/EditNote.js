import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Blob from "./Blob.js"


class EditNote extends React.Component {
  constructor() {
    super();
    this.state = {
      note: {
        title: "",
        content: "",
      },
    };
  }

  componentDidMount() {
    const url = this.props.match.params.id;
    const id = this.props.auth;
    fetch(`http://localhost:3000/users/${id}/notes/${url}`)
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          note: {
            title: data.title,
            content: data.content,
          },
        })
      );
  }

  handleTitle = (event) => {
    this.setState({
      note: {
        title: event.target.value,
        content: this.state.note.content,
      },
    });
  };

  handleContent = (event) => {
    this.setState({
      note: {
        title: this.state.note.title,
        content: event.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const url = this.props.match.params.id;
    const id = this.props.auth;
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    };

    fetch(`http://localhost:3000/users/${id}/notes/${url}`, reqObj)
      .then((resp) => resp.json())
      .then(() => this.props.history.push("/home"));
  };

  render() {
    return (
      <div style={{ backgroundColor: 'white', height: 1000 }}>
      <Grid container direction="column" justify="center" alignItems="center" style={{ backgroundColor: "white" }}>
      <Blob />
        <form onSubmit={this.handleSubmit} style={{ marginTop: 125 }}>
          <div>
            <TextField
              style={{ margin: 10 }}
              id="outlined-textarea"
              label="Title..."
              value={this.state.note.title}
              multiline
              variant="outlined"
              onChange={this.handleTitle}
            />
          </div>

          <TextField
            style={{ margin: 10 }}
            id="outlined-multiline-static"
            label="Content..."
            multiline
            rows={10}
            value={this.state.note.content}
            variant="outlined"
            onChange={this.handleContent}
          />
          <div>
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
              style={{ backgroundColor: "#7c43bd", color: "white" }}
              type="submit"
            >
              Confirm Edit
            </Button>
          </div>
        </form>
      </Grid>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth.id,
  };
}

export default connect(mapStateToProps)(EditNote);
