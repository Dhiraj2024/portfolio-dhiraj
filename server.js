
const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const contactRouter = require('./routes/contact');
app.use('/api', contactRouter);

const mongoUri = process.env.MONGODB_URI || '';
if (mongoUri) {
  mongoose
    .connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error', err));
} else {
  console.log('No MONGODB_URI provided — running in file-fallback mode.');
}

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));
// Serve assets directory explicitly (so we don't accidentally serve index.html from project root)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Setup views (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes for pages
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/requests', (req, res) => {
  res.render('requests');
});

// Fallback for non-existent routes
app.use((req, res) => {
  // For API routes, do not render here
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' });

  // If an EJS view exists, render it; otherwise fall back to index.html in project root
  const viewPath = path.join(__dirname, 'views', 'index.ejs');
  if (fs.existsSync(viewPath)) return res.render('index');

  const indexFile = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexFile)) return res.sendFile(indexFile);

  return res.status(404).send('Not found');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
