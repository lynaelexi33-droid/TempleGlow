# Biblical Skincare Sales API

A specialized backend API for a Christian-based SKINCARE line focusing on ingredients and products from the Bible.

## Features
- **Mandatory Scripture**: Every sale record includes a contextually relevant scripture (e.g., Psalm 51:7 for Hyssop cleansers).
- **Automatic Mapping**: If a scripture is not provided, the system automatically assigns one based on the skincare product.
- **Skincare Focus**: Optimized for products like Hyssop Purifying Cleanser, Frankincense & Myrrh Face Oil, Aloe & Honey Soothing Gel, etc.

## Database
The database is located at `/home/team/shared/app.db`.
- `biblical_skincare_products`: Mapping of skincare products to their primary biblical references.
- `sales`: Records of all sales including skincare product name, amount, and scripture.

## API Endpoints

### GET /api/skincare-products
Lists all available biblical skincare products and their associated scriptures.

### POST /api/sales
Creates a new sale record.

**Request Body:**
```json
{
  "skincare_product": "Hyssop Purifying Cleanser",
  "amount": 24.99
}
```
*Note: If `scripture` is not provided, it will be automatically assigned.*

### GET /api/sales
Retrieves all sale records.

## Setup
1. `npm install`
2. `node index.js`
