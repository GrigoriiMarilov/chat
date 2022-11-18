import { $host } from "./index";

export const createchat = async (nickname1, nickname2) => {
	const chat = await $host.post("/chat/", { nickname1, nickname2 })
	alert(chat.data)
	console.log(chat);
	return chat
}
export const getchat = async (userId) => {
	const chat = await $host.post("/chat/getchat/", { userId })

	return chat.data
}

export const sendmessage = async (text, userId, chatId) => {
	const message = await $host.post("/chat/message", { text, userId, chatId })
	console.log(message);
	return message
}

export const getmessages = async (chatId) => {
	const messages = await $host.post("/chat/message/send", { chatId })
	console.log(messages);
	return messages.data
}