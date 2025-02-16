import { Schema, model, models } from "mongoose";
import { Note } from "@/interfaces/interface";

const noteSchema = new Schema<Note>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Corrected model name
const noteModel = models.Note || model("Note", noteSchema);

export default noteModel;
