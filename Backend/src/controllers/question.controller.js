import { Question } from "../models/question.model.js";
import { getOrCreateTags } from "../utils/getOrCreateTag.util.js";

const addQuestion = async (req, res) => {
  try {
    const { title, description, tags, answerId } = req.body;
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tagIds = await getOrCreateTags(tags);

    const question = await Question.create({
      title,
      description,
      tags: tagIds,
      answerId,
      userId: req.user._id,
    });

    return res.status(201).json({
      message: "Question posted successfully",
      question,
    });
  } catch (error) {
    console.error("Error adding question:", error);
    return res
      .status(500)
      .json({ message: "Failed to add question", error: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("userId", "firstname lastname email")
      .populate("tags", "tagname")
      .sort({ createdAt: -1 });

    return res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return res.status(500).json({ message: "Failed to fetch questions" });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("userId", "firstname lastname email")
      .populate("tags", "tagname");

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ question });
  } catch (error) {
    console.error("Error getting question:", error);
    return res.status(500).json({ message: "Failed to get question" });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { title, description, tags, answerId } = req.body;
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    if (question.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const tagIds = await getOrCreateTags(tags);

    question.title = title || question.title;
    question.description = description || question.description;
    question.tags = tagIds || question.tags;
    question.answerId = answerId || question.answerId;

    await question.save();
    return res.status(200).json({ message: "Question updated", question });
  } catch (error) {
    console.error("Error updating question:", error);
    return res.status(500).json({ message: "Failed to update question" });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    if (
      question.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await question.deleteOne();
    return res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    return res.status(500).json({ message: "Failed to delete question" });
  }
};

export {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
