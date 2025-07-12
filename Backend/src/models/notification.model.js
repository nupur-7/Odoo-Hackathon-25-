import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    message: {
      type: String,
    },
    isRead: {
      type: Boolean,
    },
    ntype: {
      type: String,
      enum: ["ANSWER", "COMMENT", "MENTION"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    answerId: {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
