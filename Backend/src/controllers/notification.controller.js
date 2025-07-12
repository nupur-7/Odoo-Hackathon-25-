import { Notification } from "../models/notification.model.js";
export const createNotification = async ({
  userId,
  message,
  ntype,
  questionId = null,
  answerId = null,
}) => {
  try {
    const notification = await Notification.create({
      userId,
      message,
      ntype,
      questionId,
      answerId,
      isRead: false,
    });
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);

    const unreadCount = await Notification.countDocuments({
      userId,
      isRead: false,
    });

    return res.status(200).json({ notifications, unreadCount });
  } catch (error) {
    console.error("Error getting notifications:", error);
    return res.status(500).json({ message: "Failed to get notifications" });
  }
};
export const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (
      !notification ||
      notification.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.isRead = true;
    await notification.save();
    return res.status(200).json({ message: "Marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return res.status(500).json({ message: "Failed to mark as read" });
  }
};
