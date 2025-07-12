import { Tag } from "../models/tags.model.js";

export const getOrCreateTags = async (tagNames) => {
  const tags = [];
  for (const tagname of tagNames) {
    let tag = await Tag.findOne({ tagname });
    if (!tag) tag = await Tag.create({ tagname });
    tags.push(tag._id);
  }
  return tags;
};
