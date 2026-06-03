const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index")
const jwt = require("jsonwebtoken")
const jwtPassword = "123"

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username })

        if (existingUser) {
            return res.status(403).json({
                message: "User already exist"
            })
        }

        const user = new User({
            username,
            password
        })

        await user.save();

        res.json({
            message: "User created successfully"
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
        const user = await User.findOne({
            username,
            password
        })

        if (!user) {
            return res.status(403).json({
                message: "Invalid Credential"
            })
        }

        const token = jwt.sign(
            {
                userId: user._id,
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

router.get('/courses', userMiddleware, async (req, res) => {
    // Implement listing all courses logic

    const course = await Course.find({})
    res.json({
        course
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const { courseId } = req.params;

    try {
        const user = await User.findById(req.userId)
        const course = await Course.findById(courseId)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }

        user.purchasedCourses.push(courseId)
        await user.save();

        res.json({
            message: "Course purchased successfully"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const userId = req.userId;

    try {
        const user = await User.findById(userId)
        await user.populate("purchasedCourses")

        res.json({
            purchasedCourses: user.purchasedCourses
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
});

module.exports = router