const { Pool } = require("pg");
const pool = require("../config/db");

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
    // Calculation Logic to be performed
};

module.exports = {
    getAllProducts,
    getProductDetails
};