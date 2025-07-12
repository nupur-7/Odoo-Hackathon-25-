import { Vote } from "../models/vote.model.js";
import { Answer } from "../models/answer.model.js";
const voteOnAnswer = async (req, res) => {
  try {
    const { answerId, value } = req.body;
    const userId = req.user._id;

    if (!answerId || !["UPVOTE", "DOWNVOTE"].includes(value)) {
      return res.status(400).json({ message: "Invalid vote input" });
    }

    const existingVote = await Vote.findOne({ userId, answerId });

    if (existingVote) {
      existingVote.value = value;
      await existingVote.save();
    } else {
      await Vote.create({ userId, answerId, value });
    }

    return res.status(200).json({ message: "Vote recorded successfully" });
  } catch (error) {
    console.error("Error voting on answer:", error);
    return res.status(500).json({ message: "Failed to vote" });
  }
};

const acceptAnswer = async (req, res) => {
  try {
    const answerId = req.params.id;
    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const question = await Question.findById(answer.questionId);

    if (!question || question.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only question owner can accept answers" });
    }

    question.answerId = answerId;
    await question.save();

    return res.status(200).json({ message: "Answer marked as accepted" });
  } catch (error) {
    console.error("Error accepting answer:", error);
    return res.status(500).json({ message: "Failed to accept answer" });
  }
};

const getAnswerVotes = async (req, res) => {
  try {
    const { id } = req.params;

    const upvotes = await Vote.countDocuments({
      answerId: id,
      value: "UPVOTE",
    });
    const downvotes = await Vote.countDocuments({
      answerId: id,
      value: "DOWNVOTE",
    });

    return res.status(200).json({ upvotes, downvotes });
  } catch (error) {
    console.error("Error fetching vote count:", error);
    return res.status(500).json({ message: "Failed to get vote count" });
  }
};

export { getAnswerVotes, acceptAnswer, voteOnAnswer };
