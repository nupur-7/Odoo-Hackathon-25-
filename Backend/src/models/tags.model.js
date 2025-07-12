import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema(
  {
    tagname: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Tag = mongoose.model("Tag", tagSchema);
