import { Answer } from "../models/answer.model.js";
import { Question } from "../models/question.model.js";
import { createNotification } from "./notification.controller.js";

const addAnswer = async (req, res) => {
  try {
    const { description, questionId } = req.body;
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const question = await Question.findById(questionId);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    const answer = await Answer.create({
      description,
      questionId,
      userId: req.user._id,
    });

    await createNotification({
      userId: question.userId,
      message: `${req.user.fullname} answered your question.`,
      ntype: "ANSWER",
      questionId: question._id,
      answerId: answer._id,
    });

    return res
      .status(201)
      .json({ message: "Answer submitted successfully", answer });
  } catch (error) {
    console.error("Error adding answer:", error);
    return res.status(500).json({ message: "Failed to submit answer" });
  }
};

const getAnswersByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const answers = await Answer.find({ questionId })
      .populate("userId", "firstname lastname email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ answers });
  } catch (error) {
    console.error("Error fetching answers:", error);
    return res.status(500).json({ message: "Failed to fetch answers" });
  }
};

const getAnswerById = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findById(id).populate(
      "userId",
      "firstname lastname email"
    );

    if (!answer) return res.status(404).json({ message: "Answer not found" });
    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Error getting answer:", error);
    return res.status(500).json({ message: "Failed to fetch answer" });
  }
};

const updateAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const answer = await Answer.findById(id);

    if (!answer) return res.status(404).json({ message: "Answer not found" });
    if (answer.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    answer.description = description || answer.description;
    await answer.save();

    return res.status(200).json({ message: "Answer updated", answer });
  } catch (error) {
    console.error("Error updating answer:", error);
    return res.status(500).json({ message: "Failed to update answer" });
  }
};

const deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findById(id);

    if (!answer) return res.status(404).json({ message: "Answer not found" });
    if (
      answer.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await answer.deleteOne();
    return res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.error("Error deleting answer:", error);
    return res.status(500).json({ message: "Failed to delete answer" });
  }
};

export {
  addAnswer,
  getAnswersByQuestion,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
};
