import { makeAutoObservable } from "mobx";

export default class MessageStore {
	constructor() {
		this._messages = [

		]

		makeAutoObservable(this)
	}

	setMessages(message) {
		this._messages = (message)
	}
	addMessages(message) {
		this._messages.push(message)
	}
	get messages() {
		return this._messages
	}

}