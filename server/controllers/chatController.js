const { Op } = require("sequelize")
const apiError = require("../error/apiError")
const { Chat, User, ChatUser } = require("../models/models")

class chatController {
	async send(req, res) {
		const { nickname1, nickname2 } = req.body
		console.log(nickname1, nickname2)
		if (nickname1) {
			console.log(2)
			const user = await User.findOne({ where: { nickname: nickname1 } })
			const nextteller = await User.findOne({ where: { nickname: nickname2 } })
			if (!user || !nextteller) {
				return res.json("Все поля должны быть заполнены")
			}
			console.log(3)
			const chat = await Chat.create({ host: nickname1, nickname: nickname2 })
			const user1 = await User.findOne({ where: { nickname: nickname1 } })
			const user2 = await User.findOne({ where: { nickname: nickname2 } })
			await user1.addChat(chat)
			await user2.addChat(chat)
			return res.json("chat created")
		}
		else {
			return res.json("неправильные данные")
		}
	}

	async copy(req, res) {

		const { userId } = req.body

		if (userId) {

			let ChatIDs = []
			const user = User.findOne({ where: { id: userId } })

			const chats = await ChatUser.findAll({ where: { userId: userId } })
			for (let i = 0; i < chats.length; i++) {
				let id = chats[i].chatId
				const chatsforuser = await Chat.findOne({ where: { id: id } })
				ChatIDs.push(chatsforuser)
			}

			return res.json(ChatIDs)
		}
	}
}
module.exports = new chatController