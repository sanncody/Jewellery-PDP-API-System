const express = require('express');
const prodControllers = require('../controllers/product.controller')

const router = express.Router();

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     summary: Create a new product
 *     description: Create a new jewellery product with details like name, description, base weight, making charges, and certification flags
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - baseWeight
 *               - makingCharges
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *                 example: "Gold Ring with Diamond"
 *               description:
 *                 type: string
 *                 description: Detailed description of the product
 *                 example: "Beautiful gold ring with diamond setting"
 *               baseWeight:
 *                 type: number
 *                 format: decimal
 *                 description: Base weight of the product in grams
 *                 example: 5.50
 *               makingCharges:
 *                 type: number
 *                 format: decimal
 *                 description: Making charges for the product
 *                 example: 1500.00
 *               isBISHallmarked:
 *                 type: boolean
 *                 description: Whether the product is BIS hallmarked
 *                 default: false
 *                 example: true
 *               isGIACertified:
 *                 type: boolean
 *                 description: Whether the product is GIA certified
 *                 default: false
 *                 example: false
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 prodDetails:
 *                   type: object
 *                   properties:
 *                     prod_id:
 *                       type: integer
 *                       description: Unique product identifier
 *                       example: 1
 *                     prod_name:
 *                       type: string
 *                       example: "Gold Ring with Diamond"
 *                     prod_description:
 *                       type: string
 *                       example: "Beautiful gold ring with diamond setting"
 *                     prod_base_weight:
 *                       type: number
 *                       format: decimal
 *                       example: 5.50
 *                     prod_making_charges:
 *                       type: number
 *                       format: decimal
 *                       example: 1500.00
 *                     is_available:
 *                       type: boolean
 *                       example: true
 *                     is_bis_hallmarked:
 *                       type: boolean
 *                       example: true
 *                     is_gia_certified:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required fields"
 *       500:
 *         description: Internal server error
 */
router.post('/create', prodControllers.createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all available jewellery products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully retrieved all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       prod_id:
 *                         type: integer
 *                         description: Unique product identifier
 *                         example: 1
 *                       prod_name:
 *                         type: string
 *                         description: Name of the product
 *                         example: "Gold Ring"
 *                       prod_description:
 *                         type: string
 *                         description: Detailed description of the product
 *                         example: "Beautiful gold ring with diamond"
 *                       prod_base_weight:
 *                         type: number
 *                         format: decimal
 *                         description: Base weight of the product in grams
 *                         example: 5.50
 *                       prod_making_charges:
 *                         type: number
 *                         format: decimal
 *                         description: Making charges for the product
 *                         example: 1500.00
 *                       is_available:
 *                         type: boolean
 *                         description: Availability status of the product
 *                         example: true
 *                       is_bis_hallmarked:
 *                         type: boolean
 *                         description: Whether the product is BIS hallmarked
 *                         example: true
 *                       is_gia_certified:
 *                         type: boolean
 *                         description: Whether the product is GIA certified
 *                         example: false
 *       500:
 *         description: Internal server error
 */
router.get('/', prodControllers.getAllProducts);

/**
 * @swagger
 * /api/products/calcPrice:
 *   get:
 *     summary: Calculate product pricing
 *     description: Calculate the final price of a product based on metal, diamond,   
 *     purity, tax, and discount components. Note: This endpoint expects a POST body with payload containing prodId.
 *
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - payload
 *             properties:
 *               payload:
 *                 type: object
 *                 required:
 *                   - prodId
 *                 properties:
 *                   prodId:
 *                     type: integer
 *                     description: Product ID to calculate price for
 *                     example: 1
 *     responses:
 *       200:
 *         description: Successfully calculated product pricing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 priceDetails:
 *                   type: object
 *                   description: Detailed breakdown of product pricing
 *                   properties:
 *                     metalPrice:
 *                       type: number
 *                       format: decimal
 *                       description: Price based on metal weight and purity
 *                     diamondPrice:
 *                       type: number
 *                       format: decimal
 *                       description: Price based on diamond carat and quality
 *                     makingCharges:
 *                       type: number
 *                       format: decimal
 *                       description: Making charges for the product
 *                     subtotal:
 *                       type: number
 *                       format: decimal
 *                       description: Subtotal before tax and discount
 *                     taxAmount:
 *                       type: number
 *                       format: decimal
 *                       description: Tax amount
 *                     discountAmount:
 *                       type: number
 *                       format: decimal
 *                       description: Exchange discount amount
 *                     finalPrice:
 *                       type: number
 *                       format: decimal
 *                       description: Final price after all calculations
 *       400:
 *         description: Bad request - Missing product ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Payload must contain product Id to calculate final product price"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Product does not exists based on provided Id"
 *       500:
 *         description: Internal server error
 */
router.get('/calcPrice', prodControllers.calculateProductPricing);

/**
 * @swagger
 * /api/products/availability:
 *   get:
 *     summary: Check product availability
 *     description: Check if a product is available in stock based on product ID, metal ID, purity ID, and ring size ID
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: prodId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *         example: 1
 *       - in: query
 *         name: metalId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Metal ID
 *         example: 1
 *       - in: query
 *         name: purityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Purity level ID
 *         example: 1
 *       - in: query
 *         name: ringSizeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ring size ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Product availability checked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 availability:
 *                   type: boolean
 *                   description: Whether the product is available
 *                   example: true
 *                 quantity:
 *                   type: integer
 *                   description: Available quantity in stock
 *                   example: 5
 *       400:
 *         description: Bad request - Missing parameters or product out of stock
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: "All selected parameters are required"
 *                 - type: object
 *                   properties:
 *                     availablity:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: "The combination of multiple inventory factors is not supported"
 *                 - type: object
 *                   properties:
 *                     availablity:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: "Product is Out of Stock"
 *       500:
 *         description: Internal server error
 */
router.get('/availability', prodControllers.checkProdAvailability);

/**
 * @swagger
 * /api/products/{prodId}:
 *   get:
 *     summary: Get product details by ID
 *     description: Retrieve detailed information about a specific product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: prodId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique product identifier
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     prod_id:
 *                       type: integer
 *                       description: Unique product identifier
 *                       example: 1
 *                     prod_name:
 *                       type: string
 *                       description: Name of the product
 *                       example: "Gold Ring"
 *                     prod_description:
 *                       type: string
 *                       description: Detailed description of the product
 *                       example: "Beautiful gold ring with diamond"
 *                     prod_base_weight:
 *                       type: number
 *                       format: decimal
 *                       description: Base weight of the product in grams
 *                       example: 5.50
 *                     prod_making_charges:
 *                       type: number
 *                       format: decimal
 *                       description: Making charges for the product
 *                       example: 1500.00
 *                     is_available:
 *                       type: boolean
 *                       description: Availability status of the product
 *                       example: true
 *                     is_bis_hallmarked:
 *                       type: boolean
 *                       description: Whether the product is BIS hallmarked
 *                       example: true
 *                     is_gia_certified:
 *                       type: boolean
 *                       description: Whether the product is GIA certified
 *                       example: false
 *       400:
 *         description: Bad request - Product ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product Id is required to fetch particular product details"
 *       500:
 *         description: Internal server error
 */
router.get('/:prodId', prodControllers.getProductDetails);


module.exports = router;