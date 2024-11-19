import { NoteModel } from "../../models/note.model";

export function createNote(noteData) {
  const note = new NoteModel(noteData);
  return note.save();
}
// export function getNotes() {}
export function updateNotesById(id, noteData) {
  return NoteModel.findByIdAndUpdate(id, noteData);
}
export function deleteNotesById(id) {
  return NoteModel.findByIdAndDelete(id);
}

export function getNoteAll() {
  return NoteModel.find({});
}

export function getNoteById(id) {
  return NoteModel.findById(id);
}

export function getNoteAllBySearch(query) {
  let baseQuery = {};

  // Add status filter if provided
  if (query.status) {
    baseQuery.status = query.status;
  }

  // Add tags filter if provided
  if (query.tags) {
    baseQuery.tags = query.tags;
  }

  // Use OR condition if specified in the query
  if (query?.condition === "or") {
    baseQuery = {
      $or: Object.entries(baseQuery).map(([key, value]) => ({
        [key]: value,
      })),
    };
    console.log("OR condition applied with query:", baseQuery);
  }
  console.log("Query: ", {
    baseQuery,
    query,
    entries: Object.entries(baseQuery).map(([key, value]) => ({
      [key]: value,
    })),
  });
  return NoteModel.find(baseQuery);
}