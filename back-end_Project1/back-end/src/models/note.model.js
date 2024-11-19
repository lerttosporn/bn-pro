import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  tags: {
    type: String,
    default: "news",
    trim: true,
  },
});

export const NoteModel = mongoose.model("note", noteSchema);
