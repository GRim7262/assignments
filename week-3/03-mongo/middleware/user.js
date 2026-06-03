const mongoose = require("mongoose")
const { User } = require("../db/index")

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB.
    // Check readme for the exact headers to be expected

    const { username, password } = req.headers;

    const user = await User.findOne({
        username,
        password
    })

    if (user) {
        next()
    } else {
        return res.status(403).json({
            msg: "User doesn't exist"
        })
    }


}

module.exports = userMiddleware;