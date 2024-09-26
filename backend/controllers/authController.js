import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, location, role } = req.body;
    const user = new User({ fullName, email, password, phoneNumber, location, role });
    await user.save();
    return res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // User authentication logic
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid email or password", success: false });
    }

    if (role !== user.role) {
      return res.status(400).json({ message: "Role mismatch", success: false });
    }

    // Create token with user ID in payload
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    // Set token in cookies
    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      sameSite: 'strict',
    });

    return res.status(200).json({ message: "Logged in successfully", success: true, token });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully", success: true });
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, phoneNumber, location } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { fullName, phoneNumber, location },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
