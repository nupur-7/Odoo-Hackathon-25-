import mongoose, { Schema } from "mongoose";
const voteSchema = new Schema(
  {
    answerId: {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    value: {
      type: String,
      enum: ["UPVOTE", "DOWNVOTE", "NONE"],
      default: "NONE",
    },
  },
  { timestamps: true }
);

export const Vote = mongoose.model("Vote", voteSchema);
