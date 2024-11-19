import { Router } from "express";
import {
  createNote,
  deleteNotesById,
  getNoteAll,
  getNoteAllBySearch,
  getNoteById,
  updateNotesById,
} from "./note.service";

export const router = Router();

// Get all notes with optional query filters
router.get("/note", async (req, res) => {
  try {
    const notes = await getNoteAll();
    res.send(notes);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get a specific note by ID
router.get("/note/:id", async (req, res) => {
  try {
    const note = await getNoteById(req.params.id);
    if (!note) {
      return res.status(404).send({ error: "Note not found" });
    }
    res.send(note);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/a/note", async (req, res) => {
  try {
    const note = await getNoteAllBySearch(req.query);
    res.send(note);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Create a new note
router.post("/note", async (req, res) => {
  try {
    const newNote = await createNote(req.body);
    res.status(201).send(newNote);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Update a note by ID
router.patch("/note/:id", async (req, res) => {
  try {
    const updatedNote = await updateNotesById(req.params.id, req.body);
    if (!updatedNote) {
      return res.status(404).send({ error: "Note not found" });
    }
    console.log("Updated:", updatedNote);
    res.send(updatedNote);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete a note by ID
router.delete("/note/:id", async (req, res) => {
  try {
    const deletedNote = await deleteNotesById(req.params.id);
    if (!deletedNote) {
      return res.status(404).send({ error: "Note not found" });
    }
    res.status(200).send({ deletedNote, id: req.params.id, isDelete: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
