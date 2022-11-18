import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { Context } from ".."
import { getmessages, sendmessage } from "../http/chatApi"


const MesPanel = observer(() => {
	const { Activeuser, controler, chats } = useContext(Context)
	const userId = Activeuser.userId
	const [text, setText] = useState("")

	const click = async (e) => {
		e.preventDefault()
		console.log(Activeuser.userId)
		console.log(chats.selectedChat.id)
		await sendmessage(text, Activeuser.userId, chats.selectedChat.id)
		const a = await getmessages(chats.selectedChat.id)
		controler.setMessages(a)
	}

	return (
		<>
			<div className="messagepanel" >
				{
					controler.messages.map(message =>
						<div key={message.id} style={userId === message.userId ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" }}>{message.text}</div>
					)
				}
				{chats.selectedChat ? <form className="sendmessage">
					<input type="text" className="sendmessage-input" value={text} onChange={e => setText(e.target.value)}></input>
					<button onClick={click} className="sendmessage-button">отправить</button>
				</form> : ""}
			</div>

		</>
	)

})
export default MesPanel