import React from "react";

class ViewNote extends React.Component {
  constructor() {
    super();
    this.state = {
      note: [],
    };
  }

  componentDidMount() {
    const url = this.props.match.params.id;
    fetch(`https://note-ify1.herokuapp.com/notes/${url}`)
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          note: data,
        })
      );
  }
  render() {
    console.log(this.state.note);
    return (
      <h1>
        {this.state.note.title}: {this.state.note.content}
      </h1>
    );
  }
}
export default ViewNote;
