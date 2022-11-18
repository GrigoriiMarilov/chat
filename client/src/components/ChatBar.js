import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { createchat, getchat, getmessages } from "../http/chatApi";



const ChatBar = observer(() => {
	const { chats, controler, Activeuser } = useContext(Context)
	const [nickname, setNickneme] = useState('')

	useEffect(() => {
		async function data() {
			const c = await getchat(Activeuser.userId)
			chats.setChats(c)
		}
	})
	async function click(chat) {
		chats.setSelectedChat(chat)
		const a = await getmessages(chats.selectedChat.id)
		controler.setMessages(a)
		console.log(chats.selectedChat)
	}
	const requsetcreatechat = async (e) => {
		e.preventDefault()
		const a = await createchat(Activeuser.userNickname, nickname)
		console.log(a)
		const b = await getchat(Activeuser.userId)
		chats.setChats(b)

	}


	return (
		<div className="ChatBar">

			<form className="CreateChatComponent">
				<input type="text" className="CreateChatComponent_input" value={nickname} onChange={e => setNickneme(e.target.value)}></input>
				<button type="submit" className="CreateChatComponent_button" onClick={requsetcreatechat}>+</button>
			</form>

			{
				chats.aliveChats.map(chat =>
					<div key={chat.id} onClick={() => { click(chat) }} className={chat.id === chats.selectedChat.id ? "ChatCard active" : "ChatCard"} >{chat.host == Activeuser.userId ? chat.nickname : chat.host}</div>
				)
			}

		</div>

	)
})

export default ChatBar