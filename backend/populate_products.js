import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './models.js';
dotenv.config();

const products = [
  { SKU: 'P001', ProductName: 'Blue T-shirt', Price: Math.floor(Math.random()*196)+5, ImageURL: 'https://via.placeholder.com/150?text=Blue+T-shirt' },
  { SKU: 'P002', ProductName: 'Wireless Mouse', Price: Math.floor(Math.random()*196)+5, ImageURL: 'https://via.placeholder.com/150?text=Wireless+Mouse' },
  { SKU: 'P003', ProductName: 'Red Mug', Price: Math.floor(Math.random()*196)+5, ImageURL: 'https://via.placeholder.com/150?text=Red+Mug' },
  { SKU: 'P004', ProductName: 'Notebook', Price: Math.floor(Math.random()*196)+5, ImageURL: 'https://via.placeholder.com/150?text=Notebook' },
  { SKU: 'P005', ProductName: 'Bluetooth Speaker', Price: Math.floor(Math.random()*196)+5, ImageURL: 'https://via.placeholder.com/150?text=Bluetooth+Speaker' },
  { SKU: 'P006', ProductName: 'Desk Lamp', Price: Math.floor(Math.random()*196)+5, ImageURL: 'https://via.placeholder.com/150?text=Desk+Lamp' },
  { SKU: 'P007', ProductName: 'Water Bottle', Price: Math.floor(Math.random()*196)+5, ImageURL: 'https://via.placeholder.com/150?text=Water+Bottle' },
  { SKU: 'P008', ProductName: 'USB Cable', Price: Math.floor(Math.random()*196)+5, ImageURL: 'https://via.placeholder.com/150?text=USB+Cable' },
  { SKU: 'P009', ProductName: 'Black Backpack', Price: Math.floor(Math.random()*196)+5, ImageURL: 'https://via.placeholder.com/150?text=Black+Backpack' },
  { SKU: 'P010', ProductName: 'Fitness Tracker', Price: Math.floor(Math.random()*196)+5, ImageURL: 'https://via.placeholder.com/150?text=Fitness+Tracker' },
];

async function populate() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Products table populated with sample data.');
  mongoose.disconnect();
}

populate();
