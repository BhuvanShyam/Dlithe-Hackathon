// controllers/farmerDashboardController.js

import Crop from '../models/crop.model.js';
import Contract from '../models/contract.model.js';
import Notification from '../models/notification.model.js';

// Get the farmer's dashboard (list of posted crops and contract requests)
export const getFarmerDashboard = async (req, res) => {
  const farmerId = req.id; // Assuming farmer is authenticated

  try {
    // Get crops posted by the farmer
    const crops = await Crop.find({ farmer: farmerId });

    // Get contract requests from buyers for the farmer's crops
    const contractRequests = await Contract.find({ farmer: farmerId });

    // Fetch notifications related to the farmer
    const notifications = await Notification.find({ user: farmerId });

    res.status(200).json({ crops, contractRequests, notifications });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch farmer dashboard' });
  }
};

// Post a new crop (for farmer)
export const postCrop = async (req, res) => {
  const farmerId = req.user.id;
  const { type, quantity, price, availableDate, location } = req.body;

  try {
    const crop = new Crop({
      farmer: farmerId,
      type,
      quantity,
      price,
      availableDate,
      location,
    });

    await crop.save();
    res.status(201).json({ message: 'Crop posted successfully', crop });
  } catch (err) {
    res.status(500).json({ error: 'Failed to post crop' });
  }
};
