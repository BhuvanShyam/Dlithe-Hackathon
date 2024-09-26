import Crop from "../models/crop.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const createCrop = async (req, res) => {
  try {
    const { name, type, price, location } = req.body;
    const farmerId = req.id;

    const user = await User.findById(farmerId);
    console.log("User :", user);
    if (!user || user.role !== "Farmer") {
      return res
        .status(403)
        .json({
          message: "Unauthorized: You must be a farmer to create a crop.",
        });
    }

    const crop = new Crop({
      name,
      type,
      price,
      location,
      farmer: farmerId,
    });

    await crop.save();
    return res.status(201).json({ message: "Crop created successfully", crop });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getCrops = async (req, res) => {
  try {
    const crops = await Crop.find()
      .populate("farmer", "fullName location")
      .lean();
    return res.status(200).json({
      message: "Crops fetched successfully",
      crops,
      sucess: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getCropById = async (req, res) => {
  try {
    const { id } = req.params; // Access the id parameter from req.params
    const crop = await Crop.findById(id).populate(
      "farmer",
      "fullName location"
    ); // Populate farmer info

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    return res.status(200).json({
      message: "Crop fetched successfully",
      crop,
      sucess: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// In your cropController.js

export const updateCrop = async (req, res) => {
  try {
    const { id } = req.params; // Access the id parameter from req.params
    const updates = req.body;
    console.log("Crop ID:", id); // This should log the ID properly

    // Ensure the cropId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Crop ID" });
    }

    const crop = await Crop.findByIdAndUpdate(id, updates, { new: true });

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    return res.status(200).json({ message: "Crop updated successfully", crop });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params; // Access the id parameter from req.params

    const crop = await Crop.findByIdAndDelete(id); // Use id instead of cropId

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    return res.status(200).json({ message: "Crop deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
