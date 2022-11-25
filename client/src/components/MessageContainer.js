import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect, useRef } from "react"
import { Context } from ".."
import { getmessages } from "../http/chatApi"

const MessageContainer = observer(() => {
	const { Activeuser, controler, chats } = useContext(Context)
	const [section, setSection] = useState(document.getElementsByClassName('message__section'))
	const [messages, setMessages] = useState([])
	const [currentPagem, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const userId = Activeuser.userId
	const messagesEndRef = useRef(null)



	useEffect(async () => {
		messagesEndRef.current?.scrollIntoView();
	}, [])

	useEffect(async () => {
		section[0].addEventListener("scroll", scrollHandler)
		console.log(section)
		if (section[0].scrollTop < 60) {
			let a = await (getmessages(chats.selectedChat.id, currentPagem))
			console.log(a);
		}
	}, [chats, currentPagem])

	const scrollHandler = (e) => {

	}

	return (
		<section className="message__section"  >
			<div className="messages">
				<div ref={messagesEndRef} className="point">qweeeeeeeeeeeeeeeeeeee</div>
				{
					controler.messages.map(message =>
						<div key={message.id} className="message" style={userId === message.userId ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" }}>
							{message.text}
						</div>
					)
				}

			</div>
		</section>
	)
})

export default MessageContainer