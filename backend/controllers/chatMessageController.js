// controllers/chatMessageController.js
import ChatMessage from '../models/chatmessage.model.js';
import User from '../models/user.model.js';

// Send a message (createMessage)
export const createMessage = async (req, res) => {
  const { receiverId, message } = req.body;
  const senderId = req.user.id; // Assuming the user is authenticated and the user ID is available in req.user

  try {
    // Ensure that both sender and receiver exist
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

    // Create and save a new message
    const chatMessage = new ChatMessage({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    await chatMessage.save();
    res.status(201).json({ message: 'Message sent successfully', chatMessage });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Get messages between two users (getMessages)
export const getMessages = async (req, res) => {
  const { receiverId } = req.params; // Assuming receiver ID is passed as a route parameter
  const senderId = req.user.id; // Authenticated user's ID

  try {
    // Ensure that both sender and receiver exist
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

    // Retrieve all messages between the sender and receiver
    const messages = await ChatMessage.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: 1 }); // Sort messages in ascending order by creation time

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
