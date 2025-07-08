import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username is already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(200)
      .json({ success: true, message: "Successfull Registration" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error during registration" });
  }
};

export const loginUser = async (req, res) => {};

export const verifyUser = async (req, res) => {};
