import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  SKU: { type: String, required: true, unique: true },
  ProductName: { type: String, required: true },
  Price: { type: Number, required: true },
  ImageURL: { type: String, required: true },
});

const campaignSchema = new mongoose.Schema({
  CampaignID: { type: Number, auto: true, unique: true },
  Name: String,
  Description: String,
  StartDate: String,
  EndDate: String,
  DiscountType: String,
  DiscountValue: Number,
  Status: String,
  Location: String,
  Review: { type: Number, default: 0 }, // 0-5 stars
});

export const Product = mongoose.model('Product', productSchema);
export const Campaign = mongoose.model('Campaign', campaignSchema);
