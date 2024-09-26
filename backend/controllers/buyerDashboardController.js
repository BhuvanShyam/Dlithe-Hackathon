// controllers/buyerDashboardController.js

import Crop from '../models/crop.model.js';
import Contract from '../models/contract.model.js';
import Notification from '../models/notification.model.js';

// Get the buyer's dashboard (available crops and contract statuses)
export const getBuyerDashboard = async (req, res) => {
  const buyerId = req.user.id;

  try {
    // Get available crops
    const availableCrops = await Crop.find({});

    // Get contracts where the buyer is involved
    const contracts = await Contract.find({ buyer: buyerId });

    // Fetch notifications related to the buyer
    const notifications = await Notification.find({ user: buyerId });

    res.status(200).json({ availableCrops, contracts, notifications });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch buyer dashboard' });
  }
};

// Request a contract for a crop (for buyer)
export const requestContract = async (req, res) => {
  const buyerId = req.user.id;
  const { cropId, proposedPrice, proposedQuantity } = req.body;

  try {
    const crop = await Crop.findById(cropId);

    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    const contract = new Contract({
      crop: cropId,
      farmer: crop.farmer,
      buyer: buyerId,
      proposedPrice,
      proposedQuantity,
      status: 'Pending', // Pending until farmer approves
    });

    await contract.save();

    // Notify the farmer of the contract request
    const notification = new Notification({
      user: crop.farmer,
      message: `New contract request from buyer for crop ${crop.type}`,
    });
    await notification.save();

    res.status(201).json({ message: 'Contract requested successfully', contract });
  } catch (err) {
    res.status(500).json({ error: 'Failed to request contract' });
  }
};
