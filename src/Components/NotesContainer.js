import React from "react";
import Note from "./Note";
import NewNote from "./NewNote";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { fetchNotesSuccess } from "../actions/notes";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import { purple } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Map from "./Map"


class NotesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      toggled: false,
    };
  }

  componentDidMount() {
    if (!this.props.auth) {
      this.props.history.push("/login");
    } else {
      const id = this.props.auth.id;
      fetch(`https://note-ify1.herokuapp.com/users/${id}/notes`)
        .then((resp) => resp.json())
        .then((notesJSON) => {
          this.props.fetchNotesSuccess(notesJSON);
        });
    }
  }
  handleStarred = (id) => {
    console.log(id);
  };
  notes = () => {
    let filteredNotes = this.props.notes.filter((note) => {
      return note.title.toLowerCase().indexOf(this.state.input) !== -1;
    });
    let finalNotes = filteredNotes.filter((note) => {
      return note.starred === this.state.toggled;
    });
    return finalNotes.map((note, index) => {
      return <Note notes={note} key={index} star={this.handleStarred}  />
    });
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleToggle = (event) => {
    let toggle = !this.state.toggled;
    this.setState({
      toggled: toggle,
      input: this.state.input,
    });
  };

  render() {
    return (
      
      <Grid container spacing={2}>
   
        <Grid
          style={{ padding: 10, margin: 100, position: "absolute" }}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >

           <TextField
            style={{
              position: "fixed",
              left: 130,
              bottom: 655,
              backgroundColor: 'white',
              margin: 30,
            }}
            label="Search your Diary..."
            margin="normal"
            variant="outlined"
            value={this.state.input}
            onChange={this.handleChange}
          /> 
          
           <FormControlLabel
            style={{ position: "fixed", left: 25, bottom: 695 }}
            control={<Switch onChange={this.handleToggle} />}
            label="Starred"
          />  
          <Paper elevation={12}>{this.notes()}</Paper>
          
        </Grid>
        
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    auth: state.auth,
  };
};
const mapDispatchToProps = {
  fetchNotesSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
