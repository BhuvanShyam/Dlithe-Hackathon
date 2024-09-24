import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contract = mongoose.model('Contract', contractSchema);
export default Contract;
