# Smart Retail Backend API Documentation

All endpoints require the following header:
- `x-api-key`: Your API key (see .env)

## Endpoints

### 1. Get All Campaigns
- **GET** `/campaigns`
- Returns a list of all campaigns.
- **Headers:** `x-api-key`

### 2. Create Campaign
- **POST** `/campaigns`
- Creates a new campaign.
- **Headers:** `x-api-key`, `Content-Type: application/json`
- **Body:**
  - Name (string)
  - Description (string)
  - StartDate (string)
  - EndDate (string)
  - DiscountType (string)
  - DiscountValue (number)
  - Status (string)

### 3. Get Campaign by ID
- **GET** `/campaigns/:id`
- Returns a single campaign by MongoDB ID.
- **Headers:** `x-api-key`

### 4. Update Campaign
- **PUT** `/campaigns/:id`
- Updates a campaign by MongoDB ID.
- **Headers:** `x-api-key`, `Content-Type: application/json`
- **Body:** Any subset of campaign fields

### 5. Delete Campaign
- **DELETE** `/campaigns/:id`
- Deletes a campaign by MongoDB ID.
- **Headers:** `x-api-key`

### 6. Publish Campaign
- **POST** `/publishCampaign/:id`
- Sets campaign status to 'Live', generates a mock public URL, and returns a QR code for the URL.
- **Headers:** `x-api-key`
- **Response:**
  - publicUrl (string)
  - qrCode (base64 PNG)

## Example Request Headers
```
x-api-key: skretail_4f8c2e1b9a2d
Content-Type: application/json
```
