const Router = require("express")
const userController = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")
const router = new Router()

router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.get("/", userController.find)
router.get("/authorization", authMiddleware, userController.check)

module.exports = router