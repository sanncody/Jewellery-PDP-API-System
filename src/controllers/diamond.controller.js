const pool = require("../config/db");

const createDiamondInfo = async (req, res, next) => {
    const { carat, quality, pricePerCarat } = req.body;

    if (!carat || !pricePerCarat) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const createdDiamondInfo = await pool.query(
            `
                INSERT INTO Diamonds
                (Diamond_carat, Diamond_quality, Diamond_price_per_carat)
                VALUES ($1, $2, $3)
                RETURNING *
            `,
            [carat, quality, pricePerCarat]
        );

        res.status(201).json({
            success: true,
            data: createdDiamondInfo.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

const getAllDiamonds = async (req, res, next) => {
    try {
        const fetchAllDiamonds = await pool.query(
        `
            SELECT *
            FROM Diamonds
        `,
        );

        res.status(200).json({
            success: true,
            data: fetchAllDiamonds.rows
        })
    } catch (error) {
        next(error);
    }
};

const getDiamondDetails = async (req, res, next) => {
    const diamondId = req.params.diamondId;

    if (!diamondId) {
        return res.status(400).json({
            message: "Diamond Id is required to fetch particular diamond details"
        })
    }

    try {
        const diamondDetails = await pool.query(
            `
            SELECT *
            FROM Diamonds
            WHERE Diamond_Id = $1
        `,
            [diamondId]
        );

        res.status(200).json({
            success: true,
            data: diamondDetails.rows[0]
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { 
    createDiamondInfo, 
    getAllDiamonds,
    getDiamondDetails
};
