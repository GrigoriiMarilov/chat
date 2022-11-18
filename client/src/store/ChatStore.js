import { makeAutoObservable } from "mobx";

export default class ChatStore {
	constructor() {
		this._aliveChats = []
		this._selectedChat = this.aliveChats[0];
		makeAutoObservable(this);
	}

	setChats(chat) {
		this._aliveChats = (chat)
		this._selectedChat = this._aliveChats[0]
	}
	setSelectedChat(chat) {
		this._selectedChat = chat
	}

	get aliveChats() {
		return this._aliveChats
	}
	get selectedChat() {
		return this._selectedChat
	}
}