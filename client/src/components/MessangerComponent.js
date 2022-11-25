import { observer } from "mobx-react-lite"
import React, { useRef } from "react"
import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { createchat, getchat, getmessages, sendmessage } from "../http/chatApi";


const MessangerComponent = observer(() => {
	const { Activeuser, chats, controler } = useContext(Context)
	const userId = Activeuser.userId
	const [nickname, setNickneme] = useState('')
	const [text, setText] = useState('')
	const [scr, setScr] = useState(true)


	useEffect(() => {
		if (scr) {
			document.getElementsByClassName("scrollElement")[0].scrollIntoView()
			setScr(false)
		}
	}, [scr])

	async function click(chat) {
		chats.setSelectedChat(chat)
		const a = await getmessages(chats.selectedChat.id)
		controler.setMessages(a)
		setScr(true)
	}

	const click1 = async (e) => {
		e.preventDefault()
		console.log(Activeuser.userId)
		console.log(chats.selectedChat.id)
		await sendmessage(text, Activeuser.userId, chats.selectedChat.id)
		const a = await getmessages(chats.selectedChat.id, 0)
		controler.setMessages(a)
		setScr(true)
	}

	const requsetcreatechat = async (e) => {
		e.preventDefault()
		const a = await createchat(Activeuser.userNickname, nickname)
		const b = await getchat(Activeuser.userId)
		chats.setChats(b)


	}
	return (
		<>
			<div className="ChatBar">
				<form className="CreateChatComponent">
					<button type="submit" className="CreateChatComponent_button" onClick={requsetcreatechat} value={""}><svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M33.1834 30.8167L27.0001 24.6833C29.4002 21.6907 30.5626 17.8922 30.2481 14.0688C29.9336 10.2455 28.1662 6.68796 25.3093 4.12773C22.4524 1.5675 18.7231 0.199177 14.8883 0.304111C11.0535 0.409045 7.40462 1.97926 4.69199 4.6919C1.97935 7.40453 0.409136 11.0534 0.304202 14.8882C0.199268 18.723 1.56759 22.4523 4.12783 25.3092C6.68806 28.1661 10.2456 29.9335 14.0689 30.248C17.8922 30.5625 21.6908 29.4002 24.6834 27L30.8168 33.1333C30.9717 33.2895 31.156 33.4135 31.3591 33.4981C31.5622 33.5828 31.7801 33.6263 32.0001 33.6263C32.2201 33.6263 32.4379 33.5828 32.641 33.4981C32.8441 33.4135 33.0285 33.2895 33.1834 33.1333C33.4838 32.8226 33.6517 32.4072 33.6517 31.975C33.6517 31.5428 33.4838 31.1274 33.1834 30.8167ZM15.3334 27C13.026 27 10.7703 26.3158 8.85177 25.0338C6.93319 23.7519 5.43785 21.9298 4.55482 19.798C3.6718 17.6662 3.44076 15.3204 3.89092 13.0573C4.34108 10.7942 5.45223 8.71536 7.08384 7.08375C8.71545 5.45214 10.7943 4.34099 13.0574 3.89083C15.3205 3.44067 17.6663 3.67171 19.7981 4.55473C21.9299 5.43775 23.7519 6.9331 25.0339 8.85167C26.3158 10.7702 27.0001 13.0259 27.0001 15.3333C27.0001 18.4275 25.7709 21.395 23.583 23.5829C21.3951 25.7708 18.4276 27 15.3334 27Z" fill="#888888" />
					</svg>
					</button>
					<input type="text" className="CreateChatComponent_input" value={nickname} onChange={e => setNickneme(e.target.value)}></input>
				</form>
				{
					chats.aliveChats.map(chat =>
						<div key={chat.id} onClick={() => { click(chat) }} className={chat.id === chats.selectedChat.id ? "ChatCard active" : "ChatCard"} >{chat.host === Activeuser.userId ? chat.nickname : chat.host}</div>
					)
				}
			</div>
			<div className="messagepanel" >

				{<div className="messagepanelheader">{chats.selectedChat.host === Activeuser.userId ? chats.selectedChat.nickname : chats.selectedChat.host}</div>}
				<section className="message__section"  >
					<div className="messages">
						<div className="scrollElement"></div>
						{
							controler.messages.map(message =>
								<div key={message.id} className="message" style={userId === message.userId ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" }}>
									{message.text}
								</div>
							)
						}

					</div>
				</section>
				{chats.selectedChat ? <form className="sendmessage">
					<input type="text" className="sendmessage-input" value={text} onChange={e => setText(e.target.value)}></input>
					<button onClick={click1} className="sendmessage-button">отправить</button>
				</form> : ""}
			</div>
		</>
	)
})



export default MessangerComponent