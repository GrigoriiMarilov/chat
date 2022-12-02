const Router = require("express")
const chatController = require("../controllers/chatController")
const messageController = require("../controllers/messageController")
const router = new Router()

router.post("/", chatController.send)
router.post("/getchat", chatController.copy)
router.post("/message", messageController.send)
router.post("/message/send", messageController.copy)
router.post("/message/read", messageController.read)
module.exports = router