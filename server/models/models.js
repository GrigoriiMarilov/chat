const sequelize = require("../db")
const { DataTypes, DECIMAL } = require("sequelize")


const User = sequelize.define("user", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	nickname: { type: DataTypes.STRING, unique: true }
})
const Chat = sequelize.define("chat", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
	host: { type: DataTypes.STRING },
	nickname: { type: DataTypes.STRING }
})
const ChatUser = sequelize.define("ChatUser", {
	chatId: { type: DataTypes.INTEGER, primaryKey: true },
	userId: { type: DataTypes.INTEGER, primaryKey: true }
})
const Message = sequelize.define("message", {
	text: { type: DataTypes.STRING },
})


User.belongsToMany(Chat, { through: ChatUser }, { foreignKey: "chatId" })
Chat.belongsToMany(User, { through: ChatUser }, { foreignKey: "userId" })

Message.belongsTo(User)
Message.belongsTo(Chat)

Chat.hasMany(Message)



module.exports = {
	User,
	Message,
	Chat,
	ChatUser
}