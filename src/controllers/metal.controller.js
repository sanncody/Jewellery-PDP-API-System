const pool = require("../config/db");

const createMetalInfo = async (req, res, next) => {
    const {
        name,
        purity,
        color,
        pricePerGram,
        isAlloy,
        description
    } = req.body;

    if (!name || !pricePerGram) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const createdMetalInfo = await pool.query(
            `
                INSERT INTO Metals 
                (Metal_Name, Metal_Purity, Metal_Color, Metal_PricePerGram, IsAlloy, Metal_Description)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
            `,
            [
                name,
                purity,
                color,
                pricePerGram,
                isAlloy,
                description
            ]
        );

        res.status(201).json({
            success: true,
            metalDetails: createdMetalInfo.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

const getAllMetals = async (req, res, next) => {
    try {
        const fetchAllMetals = await pool.query(
        `
            SELECT *
            FROM Metals
        `,
        );

        res.status(200).json({
            success: true,
            data: fetchAllMetals.rows
        })
    } catch (error) {
        next(error);
    }
};

const getMetalDetails = async (req, res, next) => {
    const metalId = req.params.metalId;

    if (!metalId) {
        return res.status(400).json({
            message: "Metal Id is required to fetch particular metal details"
        })
    }

    try {
        const metalDetails = await pool.query(
            `
            SELECT *
            FROM Metals
            WHERE Metal_Id = $1
        `,
            [metalId]
        );

        res.status(200).json({
            success: true,
            data: metalDetails.rows[0]
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createMetalInfo,
    getAllMetals,
    getMetalDetails
}