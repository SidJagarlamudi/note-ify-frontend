import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import NotesContainer from "./NotesContainer";
import NavBar from "./NavBar";
import Fab from "@material-ui/core/Fab";
import NewNote from "./NewNote";
import ViewNote from "./ViewNote";
import EditNote from "./EditNote";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import { Route, Switch } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import Home from "./Home"

class App extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <NavBar />

        <Switch>
        <Route exact path={"/signup"} component={SignUp} />
        <Route exact path={"/"} component={Login} />
          <Route exact path={"/notes/new"} component={NewNote} />
          <Route exact path={"/notes/:id/edit"} component={EditNote} />
          <Route exact path={"/notes/:id"} component={ViewNote} />
          <Route exact path={"/home"} component={Home} />


          <Route exact path={"/notes"} component={NotesContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
