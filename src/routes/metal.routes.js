const express = require('express');
const metalControllers = require('../controllers/metal.controller');

const router = express.Router();

/**
 * @swagger
 * /api/metals/create:
 *   post:
 *     summary: Create a new metal entry
 *     description: Create a new metal type entry with details like name, purity, color, price per gram, and alloy status
 *     tags: [Metals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - pricePerGram
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the metal (e.g., Gold, Silver, Platinum)
 *                 example: "Gold"
 *               purity:
 *                 type: string
 *                 description: Purity level of the metal (e.g., 24K, 18K, 925 Sterling)
 *                 example: "24K"
 *               color:
 *                 type: string
 *                 description: Color of the metal (e.g., Yellow, White, Rose, Black)
 *                 example: "Yellow"
 *               pricePerGram:
 *                 type: number
 *                 format: decimal
 *                 description: Price per gram of the metal
 *                 example: 5500.00
 *               isAlloy:
 *                 type: boolean
 *                 description: Whether the metal is an alloy (e.g., 18K is an alloy)
 *                 default: false
 *                 example: false
 *               description:
 *                 type: string
 *                 description: Detailed description of the metal
 *                 example: "Pure 24 karat gold metal"
 *     responses:
 *       201:
 *         description: Metal information created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 metalDetails:
 *                   type: object
 *                   properties:
 *                     metal_id:
 *                       type: integer
 *                       description: Unique metal identifier
 *                       example: 1
 *                     metal_name:
 *                       type: string
 *                       example: "Gold"
 *                     metal_purity:
 *                       type: string
 *                       example: "24K"
 *                     metal_color:
 *                       type: string
 *                       example: "Yellow"
 *                     metal_pricepergram:
 *                       type: number
 *                       format: decimal
 *                       example: 5500.00
 *                     isalloy:
 *                       type: boolean
 *                       example: false
 *                     metal_description:
 *                       type: string
 *                       example: "Pure 24 karat gold metal"
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
router.post('/create', metalControllers.createMetalInfo);

/**
 * @swagger
 * /api/metals:
 *   get:
 *     summary: Get all metals
 *     description: Retrieve a list of all available metal types and their information
 *     tags: [Metals]
 *     responses:
 *       200:
 *         description: Successfully retrieved all metals
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
 *                       metal_id:
 *                         type: integer
 *                         description: Unique metal identifier
 *                         example: 1
 *                       metal_name:
 *                         type: string
 *                         description: Name of the metal
 *                         example: "Gold"
 *                       metal_purity:
 *                         type: string
 *                         description: Purity level of the metal
 *                         example: "24K"
 *                       metal_color:
 *                         type: string
 *                         description: Color of the metal
 *                         example: "Yellow"
 *                       metal_pricepergram:
 *                         type: number
 *                         format: decimal
 *                         description: Price per gram of the metal
 *                         example: 5500.00
 *                       isalloy:
 *                         type: boolean
 *                         description: Whether the metal is an alloy
 *                         example: false
 *                       metal_description:
 *                         type: string
 *                         description: Detailed description of the metal
 *                         example: "Pure gold metal"
 *       500:
 *         description: Internal server error
 */
router.get('/', metalControllers.getAllMetals);

/**
 * @swagger
 * /api/metals/{metalId}:
 *   get:
 *     summary: Get metal details by ID
 *     description: Retrieve detailed information about a specific metal by its ID
 *     tags: [Metals]
 *     parameters:
 *       - in: path
 *         name: metalId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique metal identifier
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved metal details
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
 *                     metal_id:
 *                       type: integer
 *                       description: Unique metal identifier
 *                       example: 1
 *                     metal_name:
 *                       type: string
 *                       description: Name of the metal
 *                       example: "Gold"
 *                     metal_purity:
 *                       type: string
 *                       description: Purity level of the metal
 *                       example: "24K"
 *                     metal_color:
 *                       type: string
 *                       description: Color of the metal
 *                       example: "Yellow"
 *                     metal_pricepergram:
 *                       type: number
 *                       format: decimal
 *                       description: Price per gram of the metal
 *                       example: 5500.00
 *                     isalloy:
 *                       type: boolean
 *                       description: Whether the metal is an alloy
 *                       example: false
 *                     metal_description:
 *                       type: string
 *                       description: Detailed description of the metal
 *                       example: "Pure gold metal"
 *       400:
 *         description: Bad request - Metal ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Metal Id is required to fetch particular metal details"
 *       500:
 *         description: Internal server error
 */
router.get('/:metalId', metalControllers.getMetalDetails);


module.exports = router;