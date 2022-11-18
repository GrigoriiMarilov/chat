const { Message, User, Chat } = require("../models/models")

class messageController {
	async send(req, res) {
		const { text, userId, chatId } = req.body
		const user = await User.findOne({ where: { id: userId } })
		const chat = await Chat.findOne({ where: { id: chatId } })
		const sendMessage = await Message.create({ text: text, userId: userId, chatId: chatId })
		return res.json("Успех")
	}
	async copy(req, res) {
		let messagearr = []
		const { chatId } = req.body
		const chat = await Chat.findOne({ where: { id: chatId } })
		const messages = await Message.findAll({ where: { chatId: chatId } })
		for (let i = 0; i < messages.length; i++) {
			messagearr.push(messages[i])
		}
		console.log(messagearr)
		return res.json(messagearr)
	}
}
module.exports = new messageController