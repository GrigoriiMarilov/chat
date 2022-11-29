import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/ApprRouter";
import { getchat, getmessages } from "./http/chatApi";
import { check } from "./http/userApi";
import UserStore from "./store/UserStore";


const App = observer(() => {
	const { chats, Activeuser, controler } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			check().then(async data => {
				Activeuser.setUserId(data.id)
				const a = await getchat(data.id)
				console.log(data)
				chats.setChats(a)
				Activeuser.setUserEmail(data.email)
				Activeuser.setUserNickname(data.nickname)
				Activeuser.setIsAuth(true)
				if (chats.selectedChat) {
					const b = await getmessages(chats.selectedChat.id, 0)
					controler.setMessages(b)
				}

			}).finally(() => setLoading(false))
		}, 1000)

	},
		[]
	)
	if (loading) {
		return <div></div>
	}
	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	);
})

export default App;
