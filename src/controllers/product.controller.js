const { Pool } = require("pg");
const pool = require("../config/db");
const calculatePrice = require("../utils/prodPriceCalc");

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


        if (diamondRes.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "There is no matching data with provided Product Id"
            });
        }

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

        // 5. Calculation

        const priceDetails = calculatePrice({
            metalPricePerGram,
            baseWeight: prodBaseWeight,
            makingCharges: Number(prodMakingCharges),
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

module.exports = {
    calculateProductPricing,
    getAllProducts,
    getProductDetails
};