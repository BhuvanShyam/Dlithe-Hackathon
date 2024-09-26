// controllers/requestController.js

import Request from '../models/request.model.js';
import Crop from '../models/crop.model.js';
import Notification from '../models/notification.model.js';

// Create a new contract request (buyer sends request to farmer)
export const createRequest = async (req, res) => {
  const buyerId = req.user.id; // Assuming buyer is authenticated
  const { cropId, proposedPrice, proposedQuantity } = req.body;

  try {
    // Find the crop being requested
    const crop = await Crop.findById(cropId);

    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    // Create the request
    const request = new Request({
      crop: cropId,
      farmer: crop.farmer,
      buyer: buyerId,
      proposedPrice,
      proposedQuantity,
    });

    await request.save();

    // Notify the farmer about the new request
    const notification = new Notification({
      user: crop.farmer,
      message: `New request from buyer for crop: ${crop.type}`,
    });
    await notification.save();

    res.status(201).json({ message: 'Request sent successfully', request });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create request' });
  }
};

// Farmer updates the request (accept or reject)
export const updateRequestStatus = async (req, res) => {
  const farmerId = req.user.id; // Authenticated farmer
  const { requestId } = req.params;
  const { status } = req.body; // Accept or Reject

  try {
    const request = await Request.findById(requestId);

    if (!request || request.farmer.toString() !== farmerId) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // Update request status (either 'Accepted' or 'Rejected')
    request.status = status;
    await request.save();

    // Notify the buyer about the update in request status
    const notification = new Notification({
      user: request.buyer,
      message: `Your request for crop ${request.crop} has been ${status}`,
    });
    await notification.save();

    res.status(200).json({ message: `Request ${status} successfully`, request });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update request status' });
  }
};

// Get all requests for a farmer
export const getFarmerRequests = async (req, res) => {
  const farmerId = req.user.id; // Authenticated farmer

  try {
    // Find all requests where the farmer is the recipient
    const requests = await Request.find({ farmer: farmerId }).populate('crop buyer');

    res.status(200).json({ requests });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

// Get all requests from a buyer
export const getBuyerRequests = async (req, res) => {
  const buyerId = req.user.id; // Authenticated buyer

  try {
    // Find all requests where the buyer is the sender
    const requests = await Request.find({ buyer: buyerId }).populate('crop farmer');

    res.status(200).json({ requests });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};
