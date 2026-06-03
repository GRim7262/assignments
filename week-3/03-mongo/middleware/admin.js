const mongoose = require("mongoose")
const { Admin } = require("../db/index")

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB.
    // Check readme for the exact headers to be expected
    const { username, password } = req.headers;

    const admin = await Admin.findOne({
        username,
        password
    })
    //6a1acf51d5f8f3a9d44d5908
    if (admin) {
        next()
    } else {
        return res.status(403).json({
            msg: "Admin doesn't exist"
        })
    }
}

module.exports = adminMiddleware;