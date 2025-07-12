const { User } = require("../models/user.model");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { generateAccessAndRefreshTokens } = require("../utils/jwt");

const registerSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string(),
});

const loginSchema = z.object({
  identifier: z.string(),
  password: z.string().min(6),
});

const registerUser = async (req, res) => {
  try {
    const parseResult = registerSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        message: "Validation errors",
        errors: parseResult.error.errors,
      });
    }

    const { firstname, lastname, email, password, role } = parseResult.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      role,
    });

    if (!newUser) {
      return res.status(500).json({ message: "Error creating the user" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      newUser._id
    );

    return res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
      user: {
        id: newUser._id,
        email: newUser.email,
        fullname: newUser.fullname,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const parseResult = loginSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res
      .status(400)
      .json({ message: "Validation errors", errors: parseResult.error.errors });
  }

  const { identifier, password } = parseResult.data;

  const user = await User.findOne({
    $or: [{ email: identifier }],
  });

  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id.toString()
  );

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "User Logged In Successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.fullname,
        role: user.role,
      },
      token: accessToken,
    });
};

const refreshAccessToken = async (req, res) => {
  const incomingreftoken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingreftoken) {
    return res.status(400).json({ message: "Unauthorized request" });
  }

  try {
    const decodedToken = jwt.verify(
      incomingreftoken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user || incomingreftoken !== user.refreshToken) {
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id.toString()
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "Access token refreshed successfully" });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid refresh token",
      error: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(400).json({ message: "User not authenticated" });
  }

  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: "" } },
      { new: true, timestamps: false }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User Logged Out Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error logging out user" });
  }
};

export { registerUser, loginUser, refreshAccessToken, logoutUser };
