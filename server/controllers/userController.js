const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User, Chat } = require("../models/models")
const ApiError = require('../error/apiError')

const generateJwt = (id, email, nickname) => {
	return jwt.sign(
		{ id, email, nickname },
		process.env.SECRET_KEY,
		{ expiresIn: "24h" }
	)
}


class UserController {
	async registration(req, res, next) {
		try {
			const { email, password, nickname } = req.body
			if (!email || !password || !nickname) {
				console.log(email, password, nickname)
				return res.json("Все поля должны быть заполнены")
			}
			let candidate = await User.findOne({ where: { email } })
			if (candidate) {
				return res.json("Пользователь с такой почтой уже существует")
			}
			candidate = await User.findOne({ where: { nickname } })
			if (candidate) {
				return res.json("Пользователь с таким именем уже существует")
			}
			const hashPassword = await bcrypt.hash(password, 5)
			const user = await User.create({ email, nickname, password: hashPassword })
			const mychat = await Chat.create({ host: nickname, nickname: nickname })
			user.addChat(mychat)
			const token = generateJwt(user.id, email, nickname)
			return res.json({ token })
		} catch (error) {
			res.status(500).json(error.message)
		}
	}
	async login(req, res) {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } })
		if (!user) {
			return res.json("Пользователь не найден")
		}
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return res.json("Указан неверный пароль")
		}
		const token = generateJwt(user.id, user.email, user.nickname)
		return res.json({ token })
	}

	async check(req, res) {
		const token = generateJwt(req.user.id, req.user.email, req.user.nickname)
		return res.json({ token })
	}

	async find(req, res) {
		const { email } = await req.body
		if (!email) {
			return res.json("Некоректные данные")
		}
		const candidate = await User.findAll({ where: { email } })
		return res.json({ candidate })
	}
}

module.exports = new UserController()