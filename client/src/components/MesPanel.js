import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState, useCallback } from "react"
import { Context } from ".."
import { getmessages, sendmessage } from "../http/chatApi"
import MessageContainer from "./MessageContainer"


const MesPanel = observer(() => {
	const { Activeuser, controler, chats } = useContext(Context)
	const userId = Activeuser.userId
	const [text, setText] = useState("")
	const [scroll, setScroll] = useState(0);
	const onScroll = useCallback(() => setScroll(Math.round(window.scrollY)), []);

	const click = async (e) => {
		e.preventDefault()
		console.log(Activeuser.userId)
		console.log(chats.selectedChat.id)
		await sendmessage(text, Activeuser.userId, chats.selectedChat.id)
		const a = await getmessages(chats.selectedChat.id, 0)
		controler.setMessages(a)
	}
	useEffect(() => {
		document.getElementsByClassName("point")[0].scrollIntoView()
	}, [])
	return (
		<>
			<div className="messagepanel" >

				{<div className="messagepanelheader">{chats.selectedChat.host === Activeuser.userId ? chats.selectedChat.nickname : chats.selectedChat.host}</div>}
				<MessageContainer />
				{chats.selectedChat ? <form className="sendmessage">
					<input type="text" className="sendmessage-input" value={text} onChange={e => setText(e.target.value)}></input>
					<button onClick={click} className="sendmessage-button">отправить</button>
				</form> : ""}
			</div>

		</>
	)

})
export default MesPanel