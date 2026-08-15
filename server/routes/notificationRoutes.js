import express from 'express';
import { db } from '../data/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  const userId = req.query.userId || req.headers['x-user-id'] || 'usr_citizen_1';
  const notifications = db.getNotificationsForUser(userId);
  res.json({ notifications, unreadCount: notifications.filter(n => !n.read).length });
});

router.put('/:id/read', (req, res) => {
  const notif = db.markNotificationAsRead(req.params.id);
  res.json({ notification: notif });
});

router.put('/mark-all-read', (req, res) => {
  const userId = req.body.userId || 'usr_citizen_1';
  db.markAllNotificationsAsRead(userId);
  res.json({ success: true });
});

export default router;
