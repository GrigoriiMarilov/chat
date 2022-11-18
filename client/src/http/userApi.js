import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode"

export const registration = async (email, password, nickname) => {
	const { data } = await $host.post("/user/registration", { email, password, nickname })
	localStorage.setItem('token', data.token)
	console.log(data);
	return jwt_decode(data.token)
}
export const login = async (email, password) => {
	const { data } = await $host.post("/user/login", { email, password })
	console.log(data);

	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}
export const check = async () => {
	const { data } = await $authHost.get("/user/authorization")
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}