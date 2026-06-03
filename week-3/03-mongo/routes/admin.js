const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index")

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ username })
        if (existingAdmin) {
            return res.status(403).json({
                msg: "username already exists"
            })
        }

        const admin = new Admin({
            username,
            password
        })

        await admin.save()

        res.json({
            message: "Admin created successfully"
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
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
                msg: "course already exists"
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
        res.status(500).json({
            msg: "Internal server error"
        })
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({});

        res.json({
            courses
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
});

module.exports = router;