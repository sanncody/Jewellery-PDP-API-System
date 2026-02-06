const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

const tokenAuth = (req , res) => {
    try {
        const user = req.body  //mock user

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, 
            sameSite: "lax" 
        });

        res.json({ accessToken });
    } catch (error) {
        throw Error("Error message", error.message);
    }
};

module.exports = {
    tokenAuth
};