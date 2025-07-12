import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    acceptedAnswerId: { type: Schema.Types.ObjectId, ref: "Answer" },
  },
  { timestamps: true }
);
export const Question = mongoose.model("Question", questionSchema);
