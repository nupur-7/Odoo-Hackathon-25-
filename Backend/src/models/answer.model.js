import mongoose, { Schema } from "mongoose";

const answerSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  },
  { timestamps: true }
);
export const Answer = mongoose.model("Answer", answerSchema);
