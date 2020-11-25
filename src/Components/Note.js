import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteNote } from "../actions/notes";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#000000",
    color: "#8e24aa",
    minWidth: 500,
    margin: 15,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#7c43bd",
  },
  button: {
    backgroundColor: "#7c43bd",
    color: "#ffffff",
    margin: 10,
  },
  word: {
    color: "#ffffff",
  },
}));

function Note(props) {
  const handleDelete = () => {
    const id = props.notes.id;
    const url = props.notes.id
    fetch(`https://note-ify1.herokuapp.com/users/${id}/notes/${url}`, { method: "DELETE" })
      .then((resp) => resp.json())
      .then(() => {
        props.deleteNote(id);
      });
  };

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [boolean, setStar] = React.useState(props.notes.starred);

  const handleStarClick = (id) => {
    props.star(id);
    setStar(!boolean);
    componentDidUpdate();
  };

  const componentDidUpdate = () => {
    const id = props.auth;
    const url = props.notes.id;
    const datas = {
      id: props.notes.id,
      title: props.notes.title,
      content: props.notes.content,
      starred: !props.notes.starred,
    };

    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    };

    fetch(`https://note-ify1.herokuapp.com/users/${id}/notes/${url}`, reqObj)
      .then((resp) => resp.json())
      .then(() => console.log("------"));
  };

  const starStyleWhite = {
    position: "relative",
    left: 80,
    bottom: 57,
    fontSize: 40,
    color: "white",
  };
  const starStyleYellow = {
    position: "relative",
    left: 80,
    bottom: 57,
    fontSize: 40,
    color: "#ff5c8d",
  };
  const finalStyle = boolean ? starStyleYellow : starStyleWhite;
  const url = props.notes.id;
  const initial = props.auth2[0]
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {initial}
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
      />

      <StarIcon
        onClick={() => handleStarClick(props.notes.id)}
        style={finalStyle}
      />

      <CardContent>
        <Typography
          className={classes.word}
          align="center"
          variant="h2"
          color="black"
          component="p"
        >
          {props.notes.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          component={Link}
          to={`/notes/${url}/edit`}
          classes={classes.button}
          variant="contained"
          className={classes.button}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>{" "}
        <Button
          variant="contained"
          color="#ff7043"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon
            style={{ backgroundColor: "#7c43bd", color: "white", padding: 7 }}
          />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography className={classes.word} variant="h5" color="gray">
            {props.notes.content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );

  // <Link to={`/notes/${url}`}> view me </Link>
}

const mapDispatchToProps = {
  deleteNote,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.id,
    auth2: state.auth.name,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
