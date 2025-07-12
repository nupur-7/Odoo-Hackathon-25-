import { User } from "../models/user.model.js";

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

const readAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -refreshToken");
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

export { deleteUser, readAllUsers };
