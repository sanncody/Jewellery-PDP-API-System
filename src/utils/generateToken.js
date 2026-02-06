const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    console.log(user);
    return jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
    console.log(user);
    return jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};