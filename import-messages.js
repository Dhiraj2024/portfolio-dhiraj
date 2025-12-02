/*
import-messages.js

Usage:
  - Ensure your `.env` has MONGODB_URI set, or set MONGODB_URI in the environment:
      set MONGODB_URI="your-atlas-connection-string"
      node import-messages.js

This reads `messages.json` and inserts documents into the `messages` collection via the existing Mongoose model.
*/

require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const Message = require('./models/Message');

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set. Set it in .env or in environment.');
    process.exit(1);
  }

  const dataPath = path.join(__dirname, 'messages.json');
  if (!fs.existsSync(dataPath)) {
    console.error('messages.json not found in project root.');
    process.exit(1);
  }

  const raw = fs.readFileSync(dataPath, 'utf8');
  let docs;
  try {
    docs = JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error parsing messages.json:', err);
    process.exit(1);
  }

  if (!Array.isArray(docs) || docs.length === 0) {
    console.log('No messages to import.');
    process.exit(0);
  }

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB. Inserting', docs.length, 'messages...');

  try {
    // Normalize createdAt to Date
    const normalized = docs.map(d => ({
      name: d.name,
      email: d.email,
      message: d.message,
      createdAt: d.createdAt ? new Date(d.createdAt) : new Date()
    }));

    await Message.insertMany(normalized, { ordered: false });
    console.log('Import completed successfully.');
  } catch (err) {
    console.error('Error inserting documents:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
