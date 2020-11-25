import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from '@material-ui/icons/Search';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#000000" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Welcome {props.auth}!
          </Typography>
          <Fab
            component={Link}
            to={`/notes/new`}
            class="fab"
            aria-label="edit"
            justify="center"
            style={{
              backgroundColor: "#ff5c8d",
              color: "white",
              marginBottom: 3,
              marginRight: 100,
              padding: 10,
            }}
          >
            <EditIcon />
          </Fab>

          <Button component={Link} to={`/login`} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
function mapStateToProps(state) {
  return {
   auth: state.auth.name
  }
}

export default connect(mapStateToProps)(ButtonAppBar);