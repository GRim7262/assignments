const jwt = require("jsonwebtoken")
const jwtPassword = "123"
const { User } = require("../db/index")

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB.
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
        console.log(decoded);

        req.userId = decoded.userId

        const user = await User.findById(decoded.userId)
        if (!user) {
            return res.status(403).json({
                message: "User not found"
            })
        }

        next()
    } catch (err) {
        return res.status(403).json({
            message: "Unauthorized"
        })
    }
}

module.exports = userMiddleware;