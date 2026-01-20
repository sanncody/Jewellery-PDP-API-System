const pool = require("../config/db");
const calculatePrice = require("../utils/prodPriceCalc");

const createProduct = async (req, res, next) => {
    const { 
        name,
        description,
        baseWeight,
        makingCharges,
        isBISHallmarked,
        isGIACertified
    } = req.body;

    if (!name || !baseWeight || !makingCharges) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const createdProd = await pool.query(
            `
                INSERT INTO Products 
                (Prod_Name, Prod_Description, Prod_base_weight, Prod_making_charges, is_BIS_hallmarked, is_GIA_certified)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
            `,
            [
                name,
                description,
                baseWeight,
                makingCharges,
                isBISHallmarked,
                isGIACertified
            ]
        );

        res.status(201).json({
            success: true,
            prodDetails: createdProd.rows[0]
        });

    } catch (error) {
        next(error);
    }
}; 

const getAllProducts = async (req, res, next) => {
    try {
        const fetchAllProducts = await pool.query(
        `
            SELECT *
            FROM Products
        `,
        );

        res.status(200).json({
            success: true,
            data: fetchAllProducts.rows
        })
    } catch (error) {
        next(error);
    }
};

const getProductDetails = async (req, res, next) => {
    const productId = req.params.prodId;

    if (!productId) {
        return res.status(400).json({
            message: "Product Id is required to fetch particular product details"
        })
    }

    try {
        const prodDetails = await pool.query(
        `
            SELECT *
            FROM Products
            WHERE Prod_Id = $1
        `,
            [productId]
        );

        res.status(200).json({
            success: true,
            data: prodDetails.rows[0]
        });
    } catch (error) {
        next(error);
    }
};

const calculateProductPricing = async (req, res, next) => {
    const { payload } = req.body;

    if (!payload.prodId) {
        return res.status(400).json({
            success: false,
            message: "Payload must contain product Id to calculate final product price"
        });
    }

    try {
        // 1. Product
        const productRes = await pool.query(
            `
                SELECT Prod_base_weight, Prod_making_charges
                FROM Products
                WHERE Prod_Id = $1 AND is_available = true
            `,
            [payload.prodId]
        );

        if (productRes.rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Product does not exists based on provided Id"
            });
        }

        const prodBaseWeight = productRes.rows[0]?.prod_base_weight;
        const prodMakingCharges = productRes.rows[0]?.prod_making_charges;

        // 2. Metal
        const metalRes = await pool.query(
            `
                SELECT m.Metal_PricePerGram
                FROM Metals AS m
                JOIN Product_Metal AS pm 
                ON pm.metal_id = m.Metal_Id
                WHERE pm.product_id = $1
            `,
            [payload.prodId]
        );

        const metalPricePerGram = metalRes.rows[0]?.metal_pricepergram || 0;

        // 3. Diamond
        const diamondRes = await pool.query(
            `
                SELECT d.Diamond_carat, d.Diamond_price_per_carat
                FROM Diamonds AS d
                JOIN Product_Diamond AS pd
                ON pd.diamond_id = d.Diamond_Id
                WHERE pd.product_id = $1
            `,
            [payload.prodId]
        );


        // if (diamondRes.rows.length === 0) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "There is no matching data with provided Product Id"
        //     });
        // }

        const diamondCarat = diamondRes.rows[0]?.diamond_carat || 0;
        const diamondPricePerCarat = diamondRes.rows[0]?.diamond_price_per_carat || 0;

        // 4. Pricing
        const pricingRes = await pool.query(
            `
                SELECT tax_percentage, exchange_discount
                FROM Pricing_Components
                WHERE Product_id = $1
            `,
            [payload.prodId]
        );

        const tax = pricingRes.rows[0]?.tax_percentage || 0;
        const discount = pricingRes.rows[0]?.exchange_discount || 0;

        // 5. Purity Percentage
        const purityRes = await pool.query(
            `
                SELECT p.Prod_base_weight, m.Metal_PricePerGram, pl.purity_percentage
                FROM Inventory AS i
                JOIN Products AS p ON p.Prod_Id = i.product_id
                JOIN Metals AS m ON m.Metal_Id = i.metal_id
                JOIN Purity_Levels AS pl ON pl.id = i.purity_id
                WHERE p.Prod_Id = $1;
            `,
            [payload.prodId]
        );

        const purityPercentage = purityRes.rows[0]?.purity_percentage || 0;

        // 6. Calculation
        const priceDetails = calculatePrice({
            metalPricePerGram,
            baseWeight: prodBaseWeight,
            makingCharges: Number(prodMakingCharges),
            purityPercentage,
            diamondPricePerCarat,
            diamondCarat,
            taxPercentage: tax,
            exchangeDiscount: Number(discount)
        });

        res.status(200).json({
            success: true,
            priceDetails
        });
    } catch (error) {
        next(error);
    }
};

const checkProdAvailability = async (req, res, next) => {
    // We need to check that: For Selected product + metal + purity + ring size, does the stock available or not?
    // We'll fetch data from inventory table as product must be available in inventory anyway

    const { prodId, metalId, purityId, ringSizeId } = req.query;

    if (!prodId || !metalId || !purityId || !ringSizeId) {
        return res.status(400).json({
            status: false,
            message: "All selected parameters are required"
        })
    }

    try {
        const inventoryRes = await pool.query(
            `
                SELECT quantity
                FROM Inventory
                WHERE product_id = $1
                    AND metal_id = $2
                    AND purity_id = $3
                    AND ring_size_id = $4
            `,
            [prodId, metalId, purityId, ringSizeId]
        );

        // Unsupportive combination
        if (inventoryRes.rows.length === 0) {
            return res.status(400).json({
                availablity: false,
                message: "The combination of multiple inventory factors is not supported" 
            });
        }

        const quantity = inventoryRes.rows[0].quantity;

        if (quantity <= 0) {
            return res.status(400).json({
                availablity: false,
                message: "Product is Out of Stock"
            });
        }

        res.status(200).json({
            availability: true,
            quantity
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductDetails,
    calculateProductPricing,
    checkProdAvailability
};