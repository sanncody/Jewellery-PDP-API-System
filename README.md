# Jewellery PDP API System

A backend API system designed to support a Jewellery Product Detail Page (PDP).

The system handles **product information**, **metal & diamond customization**, **price calculation**, and **inventory-based availability checks** using **Node.js, Express, and PostgreSQL**.

<br>

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Database Driver:** `pg`  
- **API Style:** REST APIs  
- **Testing:** Postman 
- **Database GUI:** Beekeeper Studio  

<br>

## 📂 Project Structure

``` Arduino
src/
│
├── controllers/
│   ├── product.controller.js
│   ├── metal.controller.js
│   └── diamond.controller.js
│
├── utils/
│   └── prodPriceCalc.js
│
├── routes/
│   ├── product.routes.js
│   ├── metal.routes.js
│   └── diamond.routes.js
│
├── middlewares/
│   └── globalErrorHandler.middleware.js
│
├── config/
│   └── db.js
|
├── db/
|   ├── junction_tables/
|   |   ├── productDiamond.sql
|   |   ├── productMetal.sql
|   |   └── productRingSize.sql
|   |   
|   |── diamond.sql
|   |── inventory.sql
|   |── metal.sql
|   |── pricing.sql
|   |── product.sql
|   |── purityLevel.sql
|   └── ringSize.sql
|
└── app.js
```

<br>

### 📌 Structure Highlights
---
- **controllers/**  
  Contains all request handling and database interaction logic.

- **utils/**  
  Holds reusable business logic (e.g., price calculation), keeping controllers clean.

- **routes/**  
  Responsible only for routing and mapping APIs to controllers.

- **middlewares/**  
  Centralized global error handling.

- **config/**  
  Database connection setup using PostgreSQL.

- **db/**  
  Pure SQL schema definitions:
  - Individual table schemas
  - Junction tables for many-to-many relationships
  - Easily executable in Beekeeper Studio or psql

  <br>

## ⚙️ How to Run the Project

### 1️⃣ Clone the Repository
```
git clone <repository-url>
```

### 2️⃣ Install Dependencies
```
npm install
```
### 3️⃣ PostgreSQL Setup

**Database Config:**
```JS
// config/db.js

const { Pool } = require("pg");

const pool = new Pool({
  host: `${DB_HOST_NAME}`,
  user: `${DB_USER}`,
  database: `${DB_NAME}`,
  port: `${DB_PORT}`,
  password: `${DB_PASSWORD}`,
});

module.exports = pool;
```

### 4️⃣ Create Tables

Run the provided SQL CREATE TABLE scripts in Beekeeper Studio or psql.

### 5️⃣ Start the Server

``` Bash
npm run dev
```

Note: Add .env file with variables in ``.env.example`` in root directory

<br>

## Why PostgreSQL over MongoDB?

The jewellery product domain involves **highly structured data** and **clear relationships** between entities such as:

- Products
- Metals
- Purity levels
- Diamonds
- Inventory combinations

This makes **PostgreSQL** a better fit for the following reasons:

### ✅ Strong Data Relationships
- One-to-many and many-to-many relationships are clearly defined (e.g. Product ↔ Metal, Product ↔ Ring Size, Product ↔ Diamond).

- Foreign keys ensure only valid combinations exist.

### ✅ Data Consistency & Accuracy
- Jewellery pricing depends on precise data (metal purity, weight, tax, discounts).

- PostgreSQL enforces **ACID compliance**, which guarantees accurate and reliable calculations.

### ✅ Data Integrity
- Constraints like `NOT NULL`, `CHECK`, and `FOREIGN KEY` prevent invalid or incomplete data.

- Inventory and pricing logic remain consistent across the system.

### ❌ Why MongoDB is Not Preferred Here
- MongoDB allows flexible, schema-less data, which can lead to:
  - Inconsistent or distorted data structures
  - Duplication of pricing and inventory logic

- Managing complex relationships and validations becomes cumbersome.

- Enforcing strict pricing and inventory rules requires additional application-level checks.

### ✅ Conclusion
Since this system requires **structured schemas, strong relationships, and precise pricing calculations**, PostgreSQL is more suitable than MongoDB for this Jewellery PDP backend system.

<br>

## 💰 Pricing Logic

The final jewellery product price is calculated dynamically based on multiple factors to ensure accuracy and consistency.

### 🔹 Components Used in Price Calculation

1. **Metal Type & Purity**
   - Base metal price per gram
   - Purity percentage  
     - Example:  
       - 24K → 100%  
       - 18K → 75%

2. **Product Base Weight**
   - Weight of the metal used in the product (in grams)

3. **Diamond Price**
   - Calculated using:
     - Diamond carat
     - Price per carat

4. **Making Charges**
   - Fixed or configurable making cost for the product

5. **Tax**
   - Percentage-based tax applied on subtotal

6. **Discount (Optional)**
   - Exchange or promotional discount, if applicable

---

### 🧮 Price Calculation Formula

``` Bash
Metal_Price = base_weight × metal_price_per_gram × purity_percentage

Diamond_Price = diamond_carat × diamond_price_per_carat

Subtotal = Metal Price + Diamond Price + Making Charges

Tax = Subtotal × tax_percentage

Final_Price = Subtotal + Tax − Discount
```
👉 All calculation logic is isolated inside utils/prodPriceCalc.js.

<br>

## 🔌 API Endpoints

All APIs are REST-based and designed to support the Jewellery Product Detail Page (PDP) functionality, including product information, pricing calculation, and inventory availability.

Base URL: [http://localhost:3000/api](http://localhost:3000/api)


<br>

## 🛍️ Product Endpoints

### 🔹 Fetch All Products

Fetches all available jewellery products.

**Endpoint**
```Bash
[GET] /products/
```

**Response**
```JSON
{
    "success": true,
    "data": [
        {
            "prod_id": 1,
            "prod_name": "Gold Ring Classic",
            "prod_description": "Classic 18K gold ring suitable for daily wear",
            "prod_base_weight": "6.50",
            "prod_making_charges": "1200.00",
            "is_available": true,
            "is_bis_hallmarked": true,
            "is_gia_certified": false
        },
        {
            "prod_id": 2,
            "prod_name": "Diamond Engagement Ring",
            "prod_description": "Elegant diamond ring for engagement",
            "prod_base_weight": "4.20",
            "prod_making_charges": "2500.00",
            "is_available": true,
            "is_bis_hallmarked": true,
            "is_gia_certified": true
        },
        ...
    ]
}
```

### 🔹 Fetch Single Product Details

Fetches details of a specific product.

**Endpoint**
```Bash
[GET] /products/:prodId
```

**Response**
```JSON
{
    "success": true,
    "data": {
        "prod_id": 5,
        "prod_name": "Diamond Stud Earrings",
        "prod_description": "Minimal diamond stud earrings",
        "prod_base_weight": "3.10",
        "prod_making_charges": "1800.00",
        "is_available": true,
        "is_bis_hallmarked": true,
        "is_gia_certified": true
    }
}
```
### 🔹 Calculate Product Price

Dynamically calculates the final price based on selected customization options.

**Endpoint**
```Bash
[GET] /products/calcPrice
```

**Request Body**
```JSON
{
    "payload": {
        "prodId": 2
    }
}
```

**Response**
```JSON
{
    "success": true,
    "priceDetails": {
        "metalCost": 1953000,
        "purityFactor": "75%",
        "diamondCost": 60000,
        "makingCharges": 2500,
        "basePrice": 2015500,
        "taxAmount": 60465,
        "exchangeDiscount": 1000,
        "finalPrice": 2074965
    }
}
```

### 🔹 Check Product Availability

Checks whether a product is available for the selected configuration inside inventory

**Query Parameters**
| Parameter  | Type   |
| ---------- | ------ |
| prodId     | number |
| metalId    | number |
| purityId   | number |
| ringSizeId | number |

<br>

**Endpoint**
```Bash
[GET] /products/availability?prodId=2&metalId=1&purityId=3&ringSizeId=4
```

***Response***
```JSON
{
    "availability": true,
    "quantity": 10
}
```

### 🔹 Create Product

Creates a new jewellery product entry inside postgres DB.

**Endpoint**
```Bash
[POST] /products/create
```

**Request Body**
```JSON
{
    "name": "Rose Gold Pendant",
    "description": "Rose gold heart-shaped pendant",
    "baseWeight": 5.40,
    "makingCharges": 1400.00,
    "isBISHallmarked": "TRUE",
    "isGIACertified": "FALSE"
}
```

**Response**
```JSON
{
    "success": true,
    "prodDetails": {
        "prod_id": 8,
        "prod_name": "Rose Gold Pendant",
        "prod_description": "Rose gold heart-shaped pendant",
        "prod_base_weight": "5.40",
        "prod_making_charges": "1400.00",
        "is_available": true,
        "is_bis_hallmarked": true,
        "is_gia_certified": false
    }
}
```

## 🛍️ Metal Endpoints

### 🔹 Create Metal

Creates a new metal info entry inside postgres DB.

**Endpoint**
```Bash
[POST] /metals/create
```

**Request Body**
```JSON
{
    "name": "Silver",
    "purity": "999",
    "color": "White",
    "pricePerGram": 85.0000,
    "isAlloy": "FALSE",
    "description": "Pure silver for coins"
}
```

**Response**
```JSON
{
    "success": true,
    "metalDetails": {
        "metal_id": 20,
        "metal_name": "Silver",
        "metal_description": "Pure silver for coins",
        "metal_purity": "999",
        "metal_color": "White",
        "metal_pricepergram": "85.0000",
        "isalloy": false
    }
}
```

### 🔹 Fetch All Metals

Fetches information of all metals.

**Endpoint**
```Bash
[GET] /metals/
```

**Response**
```JSON
{
    "success": true,
    "data": [
        {
            "metal_id": 1,
            "metal_name": "Gold",
            "metal_description": "Pure gold used for coins and investment",
            "metal_purity": "24K",
            "metal_color": "Yellow",
            "metal_pricepergram": "6200.0000",
            "isalloy": false
        },
        {
            "metal_id": 2,
            "metal_name": "Gold",
            "metal_description": "Popular for traditional jewellery",
            "metal_purity": "22K",
            "metal_color": "Yellow",
            "metal_pricepergram": "5700.0000",
            "isalloy": true
        },
        ...
    ]
}
```

### 🔹 Fetch Single Metal Details

Fetches details of a specific metal.

**Endpoint**
```Bash
[GET] /metals/:metalId
```

**Response**
```JSON
{
    "success": true,
    "data": {
        "metal_id": 5,
        "metal_name": "Platinum",
        "metal_description": "Premium metal for wedding bands",
        "metal_purity": "950",
        "metal_color": "White",
        "metal_pricepergram": "3200.0000",
        "isalloy": false
    }
}
```

## 💎 Diamond Endpoints

### 🔹 Create Diamond

Adds a new diamond configuration to a postgres DB.

**Endpoint**
```Bash
[POST] /diamonds/create
```

**Request Body**
```JSON
{
    "carat": 1.50,
    "quality": "SI2",
    "pricePerCarat": 180000.00
}
```

**Response**
```JSON
{
    "success": true,
    "data": {
        "diamond_id": 8,
        "diamond_carat": "1.50",
        "diamond_quality": "SI2",
        "diamond_price_per_carat": "180000.00"
    }
}
```

### 🔹 Fetch All Diamonds

Fetches information of all diamonds which are available.

**Endpoint**
```Bash
[GET] /diamonds/
```

**Response**
```JSON
{
    "success": true,
    "data": [
        {
            "diamond_id": 1,
            "diamond_carat": "0.30",
            "diamond_quality": "VVS1",
            "diamond_price_per_carat": "85000.00"
        },
        {
            "diamond_id": 2,
            "diamond_carat": "0.50",
            "diamond_quality": "VVS2",
            "diamond_price_per_carat": "120000.00"
        },
        ...
    ]
}
```

### 🔹 Fetch Single Diamond Details

Fetches details of a specific diamond.

**Endpoint**
```Bash
[GET] /diamonds/:diamondId
```

**Response**
```JSON
{
    "success": true,
    "data": {
        "diamond_id": 4,
        "diamond_carat": "1.00",
        "diamond_quality": "VS2",
        "diamond_price_per_carat": "220000.00"
    }
}
```

### ⚠️ Error Handling

All APIs use a centralized global error handler middleware.

**Usage**

This errorHandler middleware is defined at last after defining all the routes.

```JS
app.use(globalErrorHandler)
```

**Sample Error Response**
```JS
{
    success: false,
    message: 'Database operation failed'
}
```

<br>

## ⚠️ Edge Case Handling

The system is designed to handle common real-world edge cases gracefully to ensure reliability and correct behaviour.

---

### ❌ Invalid or Missing Inputs

- All required query parameters and request body fields are validated at the API level.
- If any required parameter (e.g., `prodId`, `metalId`, `purityId`, `ringSizeId`) is missing or invalid, the API returns a clear `400 Bad Request` response.
- This prevents unnecessary database queries and avoids unexpected crashes.

**Example**
```json
{
  "status": false,
  "message": "All selected parameters are required"
}
```

### 🚫 Unsupported Customization Combinations

Not all combinations of product, metal, purity, and ring size are valid.

**For example**

- A specific ring size may not be available for a particular metal or purity.

- A product may not support certain diamond or metal combinations.

- The system checks the Inventory table to verify whether the selected combination exists.

- If no matching inventory record is found, the API clearly informs the user that the selected configuration is not supported.

**Error Response**

```JS
if (inventoryRes.rows.length === 0) {
    return res.status(400).json({
        availablity: false,
        message: "The combination of multiple inventory factors is not supported" 
    });
}
```

### 📦 Out-of-Stock Selections

- Even if a customization combination exists, the product may be temporarily out of stock.

- The inventory quantity is checked in real time.

- If the quantity is 0 or less, the API responds with an Out of Stock message instead of allowing the purchase flow.

**Example**
```JS
if (quantity <= 0) {
    return res.status(400).json({
        availablity: false,
        message: "Product is Out of Stock"
    });
}
```

### 💰 Price Mismatch / Stale Pricing Handling

- Pricing is always calculated dynamically using the latest values stored in the database.

- Metal prices, diamond prices, tax, and discounts are fetched at the time of calculation.

- Since pricing is computed on-demand and not cached, stale pricing scenarios are naturally avoided.

- Although a createdAt or versioning field is not implemented in this assignment (to keep scope minimal), dynamic calculation ensures price consistency.


**Justification**

For this assignment scope, real-time calculation using current database values is sufficient to prevent outdated pricing without introducing additional complexity.

<br>

## 🧩 Assumptions Made

To keep the implementation focused, clear, and aligned with the assignment scope, the following assumptions were made:

---

### 📦 Inventory Structure

- Each row in the `Inventory` table represents a **unique and valid combination** of:
  - Product
  - Metal type
  - Purity level
  - Ring size
- This design ensures accurate availability checks and avoids ambiguity while calculating stock.

**Example:**  
A gold ring of 18K purity in size 7 is treated as a separate inventory entry from the same ring in size 8 or with a different purity.

---

### 💰 Pricing Components

- Pricing components such as:
  - Making charges
  - Tax percentage
  - Discount (if applicable)
- are assumed to be **product-specific** and stored accordingly.

- This allows flexible pricing control at the product level without duplicating logic.

---

### 💎 Diamond Pricing

- Diamond pricing is calculated **per carat**.

- The final diamond price is derived using:
  - Selected diamond carat value
  - Price per carat stored in the database

- Only one diamond configuration per product is assumed for simplicity.

---

### 🔐 Authentication & UI Scope

- Authentication, authorization, payments, and frontend/UI implementation are **out of scope** for this assignment.

- The focus is strictly on backend API design, data modelling, and pricing logic.

---

### 🧠 System Focus

- Emphasis is placed on:
  - Clean API design
  - Logical data modelling
  - Accurate price calculation
  - Inventory availability handling

- Advanced architecture patterns, caching layers, or UI-level optimizations are intentionally excluded to keep the solution aligned with the problem statement.

---

### ✅ Summary

These assumptions help maintain a clean, understandable backend system while accurately simulating a real-world jewellery product detail page (PDP) at a functional level.