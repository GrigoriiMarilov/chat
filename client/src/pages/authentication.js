import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MESSAGE_ROUTE, REGISTRATION_ROUTE } from "../utils/const";
import { login, registration } from "../http/userApi";
import { Context } from "..";
import { getchat } from "../http/chatApi";



const Authentication = observer(() => {
	const location = useLocation()
	const navigate = useNavigate()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [nickname, setNickname] = useState('')
	const { Activeuser, chats } = useContext(Context)

	const click = async (e) => {
		e.preventDefault();
		try {
			let data = {};
			if (isLogin) {
				data = await login(email, password)
				await Activeuser.setIsAuth(true)
			} else {
				data = await registration(email, password, nickname)
				await Activeuser.setIsAuth(true)
			}
			Activeuser.setUserId(data.id)
			Activeuser.setUserEmail(data.email)
			Activeuser.setUserNickname(data.nickname)
			const c = await getchat(Activeuser.userId)
			chats.setChats(c)
			navigate(MESSAGE_ROUTE)
		} catch (error) {
			alert(error.message)
		}
	}
	return (
		<div className="auth">
			<form className="auth_form">
				<h2>{isLogin ? "Авторизация" : "Регистрация"}</h2>
				<input placeholder="Ваш Email" type="login" value={email} onChange={e => setEmail(e.target.value)}></input>
				<input placeholder="Ваш пароль" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
				{!isLogin ? <input placeholder="Ваш никнейм" type="" value={nickname} onChange={e => setNickname(e.target.value)} ></input> : ""}
				<span>{isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
					{isLogin ?
						<Link to={REGISTRATION_ROUTE}>зарегестрируйтесь!</Link>
						:
						<Link to={LOGIN_ROUTE}>Войдите тут</Link>
					}
				</span>
				{isLogin ?
					<button className="Login_button" onClick={click} >Войти</button>
					:
					<button className="Login_button" onClick={click}>Зарегестрировать</button>
				}
			</form>
		</div>
	)
})

export default Authentication