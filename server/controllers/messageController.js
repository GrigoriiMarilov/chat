const { Message, User, Chat } = require("../models/models")
const sequelize = require('sequelize')
class messageController {
	async send(req, res) {
		const { text, userId, chatId } = req.body
		const user = await User.findOne({ where: { id: userId } })
		const chat = await Chat.findOne({ where: { id: chatId } })
		const sendMessage = await Message.create({ text: text, userId: userId, chatId: chatId, isRead: false })
		return res.json("Успех")
	}
	async copy(req, res) {
		let messagearr = []
		const { chatId, offset } = req.body
		if (!chatId) {
			return res.json("error: undefinded chat id")
		}
		const chat = await Chat.findOne({ where: { id: chatId } })
		const count = await Message.count({ where: { chatId: chat.id } })
		const messages = await Message.findAll({ order: sequelize.literal('id DESC'), where: { chatId: chatId }, offset: offset, limit: 30 })
		for (let i = 0; i < messages.length; i++) {
			messagearr.push(messages[i])
		}
		res.setHeader('Length', count)
		return res.json(messagearr)
	}
	async read(req, res) {
		try {
			const { messageId } = req.body
			if (messageId) {
				for (i = 0; i < messageId.length; i++) {
					const message = Message.findOne({ where: { id: messageId[i] } })
					if (message) await Message.update({ isRead: true }, { where: { id: messageId } })
				}
			}
		} catch (error) {
			return res.json(error)
		}
	}
}
module.exports = new messageController