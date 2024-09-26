// controllers/notificationController.js

import Notification from '../models/notification.model.js';

// Fetch notifications for a user
export const getNotifications = async (req, res) => {
  const userId = req.user.id; // Assuming user is authenticated

  try {
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
};
