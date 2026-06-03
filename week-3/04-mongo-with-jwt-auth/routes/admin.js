const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index")
const jwt = require("jsonwebtoken")
const jwtPassword = "123"

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ username })

        if (existingAdmin) {
            return res.status(403).json({
                message: "username already exists."
            })
        }

        const admin = new Admin({
            username,
            password
        })

        await admin.save();

        res.json({
            message: "Admin created successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({
            username,
            password
        })

        if (!admin) {
            return res.status(403).json({
                message: "Invaild username"
            })
        }

        const token = jwt.sign(
            {
                adminId: admin._id
            },
            jwtPassword
        )
        res.json({
            token: token
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink } = req.body;

    try {
        const existingCourse = await Course.findOne({
            title,
            description,
            price,
            imageLink
        })

        if (existingCourse) {
            return res.status(403).json({
                message: "Course already exists"
            })
        }

        const course = new Course({
            title,
            description,
            price,
            imageLink
        })

        await course.save()

        res.json({
            message: "Course created successfully",
            courseId: course._id
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({})

        res.json({
            courses
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
});

module.exports = router;