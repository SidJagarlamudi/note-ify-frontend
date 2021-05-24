import React from "react";
import NotesContainer from "./NotesContainer";
import Map from "./Map";
import Bird from "./Bird.js"

import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

class App extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div style={{ backgroundColor: 'white' , height: 10000}}>
       
        <NotesContainer />
        <Map />
      </div>
    );
  }
}

export default App;
