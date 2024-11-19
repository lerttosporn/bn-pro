import bodyParser from "body-parser";
import express from "express";
import { router as noteRouter } from "./modules/note/note.controller";
import mongoose from "mongoose";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(noteRouter);

app.listen(3000, async () => {
  console.log("Server is running on http://localhost:3000");
  mongoose.set("strictQuery", true);
  await mongoose.connect(
    "mongodb+srv://lerttosporns:Ler_35711@data.w4ukj.mongodb.net/?retryWrites=true&w=majority&appName=data"
  );
});