export const fetchNotesSuccess = (notes) =>{
  return {
    type: 'FETCH_NOTES_SUCCESS',
    notes
  }
}
export const deleteNote = (id) =>{
  return {
    type: 'DELETE_NOTE_SUCCESS',
    id
  }
}