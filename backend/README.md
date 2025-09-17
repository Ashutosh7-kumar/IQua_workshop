# Smart Retail Promotions Hub Backend

This backend is built with Express.js, Node.js, and Mongoose for the Smart Retail Promotions Hub application. It provides APIs for managing retail campaigns and products.

## Setup
1. Install dependencies: `npm install`
2. Configure environment variables in `.env`.
3. Start the server: `npm start` or `node index.js`

## Structure
- `infra/` - Infrastructure scripts and configs
- `models/` - Mongoose models
- `routes/` - API routes
- `index.js` - Main server entry point

## Features
- CRUD for Campaigns
- Product management
- API key security
- QR code generation
- CORS enabled

## Database
Uses MongoDB via Mongoose.
