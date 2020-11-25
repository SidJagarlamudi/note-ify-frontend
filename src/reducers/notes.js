export default function notes(state = [], action) {
  switch (action.type) {
    case "FETCH_NOTES_SUCCESS":
      return [...action.notes];
    case "DELETE_NOTE_SUCCESS":
      return state.filter((note) => note.id !== action.id);
    default:
      return state;
  }
}
