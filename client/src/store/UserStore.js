import { makeAutoObservable } from "mobx";

export default class UserStore {
	constructor() {
		this._isAuth = false
		this._userId = 0
		this._userEmail = 0
		this._userNickname = 0
		makeAutoObservable(this)
	}

	setIsAuth(bool) {
		this._isAuth = bool
	}
	setUserId(id) {
		this._userId = id
	}
	setUserEmail(email) {
		this._userEmail = email
	}
	setUserNickname(nickname) {

		this._userNickname = nickname
	}
	get isAuth() {
		return this._isAuth
	}
	get userId() {
		return this._userId
	}
	get userEmail() {
		return this._userEmail
	}
	get userNickname() {
		return this._userNickname
	}
}