const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Message = require('../models/Message');

const MESSAGES_FILE = path.join(__dirname, '..', 'messages.json');

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email and message.' });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      const m = new Message({ name, email, message });
      await m.save();
      return res.status(201).json({ success: true, source: 'mongodb' });
    }

    // Fallback to file storage when MongoDB not configured
    let list = [];
    try {
      const raw = fs.readFileSync(MESSAGES_FILE, 'utf8');
      list = JSON.parse(raw || '[]');
    } catch (e) {
      list = [];
    }

    list.unshift({ name, email, message, createdAt: new Date() });
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(list, null, 2));
    return res.status(201).json({ success: true, source: 'file' });
  } catch (err) {
    console.error('Error saving contact message:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Admin endpoint to list messages. Protect with ADMIN_KEY env var if set.
router.get('/messages', async (req, res) => {
  const adminKey = process.env.ADMIN_KEY;
  const provided = req.query.key || req.headers['x-admin-key'];
  if (adminKey && provided !== adminKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      const list = await Message.find().sort({ createdAt: -1 }).lean();
      return res.json({ source: 'mongodb', messages: list });
    }

    let list = [];
    try {
      const raw = fs.readFileSync(MESSAGES_FILE, 'utf8');
      list = JSON.parse(raw || '[]');
    } catch (e) {
      list = [];
    }
    return res.json({ source: 'file', messages: list });
  } catch (err) {
    console.error('Error reading messages:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
