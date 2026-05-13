const jwt = require('jsonwebtoken');
require('dotenv').config();

const userCheck = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // contains user id
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token", error: err.message });
    }
}

module.exports = {
    userCheck
}  