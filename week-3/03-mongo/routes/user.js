const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index")

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(403).json({
                msg: "User already exists"
            })
        }

        const user = new User({
            username,
            password
        })

        await user.save()

        res.json({
            message: "User created successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find({})

        res.json({
            courses
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const { username } = req.headers;
    try {
        const user = await User.findOne({ username })
        const course = await Course.findById(courseId)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        user.purchasedCourses.push(courseId)
        await user.save()

        res.json({
            message: "Course purchased successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const { username } = req.headers;

    try {
        const user = await User.findOne({ username }).populate("purchasedCourses")

        res.json({
            purchasedCourses: user.purchasedCourses
        })
    } catch (err) {
        return res.status(500).json({
            message: "Interval Server Error"
        })
    }

});

module.exports = router