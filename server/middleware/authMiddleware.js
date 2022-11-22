const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
	if (req.method === "OPTIONS") {
		next()
	}
	const str = req.headers.authorization
	const token = str.split(" ")[1]  //Bearer gregoinerign
	try {
		if (!token) {
			return res.status.json({ message: "нет токена" })
		}
		console.log(token)
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		req.user = decoded
		next()
	} catch (error) {
		res.status(401).json({ message: "Не авторизован" })
	}
}