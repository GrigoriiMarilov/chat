import axios from "axios"

const $host = axios.create({
	baseURL: "http://192.168.1.11:5000"
})

const $authHost = axios.create({
	baseURL: "http://192.168.1.11:5000"
})


const authInterceptor = config => {
	config.headers.Authorization = "Bearer " + (localStorage.getItem("token"))
	return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
	$authHost,
	$host
}