import Contract from '../models/Contract.js';
import User from '../models/User.js';
import Crop from '../models/Crop.js';


export const createContract = async (req, res) => {
  try {
    const { buyerId, cropId } = req.body;
    const farmerId = req.userId; 

   
    const buyer = await User.findById(buyerId);
    if (!buyer || buyer.role !== 'Buyer') {
      return res.status(404).json({ message: 'Buyer not found or is not a buyer.' });
    }

    
    const crop = await Crop.findById(cropId);
    if (!crop || crop.farmer.toString() !== farmerId) {
      return res.status(404).json({ message: 'Crop not found or does not belong to the farmer.' });
    }

    const contract = new Contract({
      farmer: farmerId,
      buyer: buyerId,
      crop: cropId,
    });

    await contract.save();
    return res.status(201).json({ message: 'Contract created successfully', contract });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};


export const getContracts = async (req, res) => {
  try {
    const farmerId = req.userId; 
    const contracts = await Contract.find({
      $or: [{ farmer: farmerId }, { buyer: farmerId }],
    })
      .populate('farmer', 'fullName location')
      .populate('buyer', 'fullName location')
      .populate('crop', 'name type price location')
      .lean(); 
    return res.status(200).json(contracts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Retrieve a specific contract by ID
export const getContractById = async (req, res) => {
  try {
    const { contractId } = req.params;

    const contract = await Contract.findById(contractId)
      .populate('farmer', 'fullName location')
      .populate('buyer', 'fullName location')
      .populate('crop', 'name type price location');

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    return res.status(200).json(contract);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Update a contract by ID
export const updateContract = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { status } = req.body; // Assume we only allow status updates

    const contract = await Contract.findByIdAndUpdate(
      contractId,
      { status },
      { new: true }
    );

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    return res.status(200).json({ message: 'Contract updated successfully', contract });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a contract by ID
export const deleteContract = async (req, res) => {
  try {
    const { contractId } = req.params;

    const contract = await Contract.findByIdAndDelete(contractId);

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    return res.status(200).json({ message: 'Contract deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
