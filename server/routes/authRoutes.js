import express from 'express';
import { db } from '../data/database.js';

const router = express.Router();

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  let user = db.getUserByEmail(email);
  if (!user) {
    // Auto-create guest/demo citizen user if logging in
    user = db.createUser({
      name: email.split('@')[0],
      email,
      role: email.includes('gov') ? 'AUTHORITY' : 'CITIZEN'
    });
  }

  res.json({
    token: `jwt_civic_${user.id}_${Date.now()}`,
    user
  });
});

// Register
router.post('/register', (req, res) => {
  const { name, email, role, phone, address } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const existing = db.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'User already exists with this email' });
  }

  const user = db.createUser({
    name,
    email,
    role: role || 'CITIZEN',
    phone: phone || '+91 98765 43210',
    address: address || 'Noida, Sector 62'
  });

  res.json({
    token: `jwt_civic_${user.id}_${Date.now()}`,
    user
  });
});

// Switch demo role quickly
router.post('/switch-demo', (req, res) => {
  const { role } = req.body; // 'CITIZEN' | 'AUTHORITY' | 'ADMIN'
  const user = db.users.find(u => u.role === role) || db.users[0];
  res.json({
    token: `jwt_civic_${user.id}_demo`,
    user
  });
});

// Me
router.get('/me', (req, res) => {
  const userId = req.headers['x-user-id'] || 'usr_citizen_1';
  const user = db.getUserById(userId) || db.users[0];
  res.json({ user });
});

export default router;
