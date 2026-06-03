const jwt = require("jsonwebtoken")
const jwtPassword = "123"
const { Admin } = require("../db/index")

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB.
    // Check readme for the exact headers to be expected
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({
            message: "No token provided"
        })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, jwtPassword)
        req.adminId = decoded.adminId

        const admin = await Admin.findById(decoded.adminId)
        if (!admin) {
            return res.status(403).json({
                message: "Admin not found"
            })
        }

        next();
    } catch (err) {
        return res.status(403).json({
            message: "Unauthorized"
        })
    }
}

module.exports = adminMiddleware;