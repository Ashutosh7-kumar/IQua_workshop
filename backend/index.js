
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { Product, Campaign } from './models.js';
import { generateQRCode } from './publish_utils.js';

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Root route (no API key required)
app.get('/', (req, res) => {
  res.send('Welcome to Smart Retail Promotions Hub Backend!');
});

// API key middleware
app.use((req, res, next) => {
  if (req.headers['x-api-key'] !== API_KEY) {
    return res.status(401).json({ error: 'Invalid API Key' });
  }
  next();
});


// Get all campaigns
app.get('/campaigns', async (req, res) => {
  const campaigns = await Campaign.find();
  res.json(campaigns);
});

// Get campaign by ID
app.get('/campaigns/:id', async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign) return res.status(404).json({ error: 'Not found' });
  res.json(campaign);
});

// Create a campaign
app.post('/campaigns', async (req, res) => {
  const campaign = new Campaign(req.body);
  await campaign.save();
  res.status(201).json(campaign);
});

// Update campaign
app.put('/campaigns/:id', async (req, res) => {
  const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!campaign) return res.status(404).json({ error: 'Not found' });
  res.json(campaign);
});

// Delete campaign
app.delete('/campaigns/:id', async (req, res) => {
  const campaign = await Campaign.findByIdAndDelete(req.params.id);
  if (!campaign) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

// Publish campaign
app.post('/publishCampaign/:id', async (req, res) => {
  const campaign = await Campaign.findByIdAndUpdate(req.params.id, { Status: 'Live' }, { new: true });
  if (!campaign) return res.status(404).json({ error: 'Not found' });
  const publicUrl = `https://smartretailhub.com/campaign/${campaign._id}`;
  const qrCode = await generateQRCode(publicUrl);
  res.json({ publicUrl, qrCode });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
