import { observer } from "mobx-react-lite"
import React, { useRef } from "react"
import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { createchat, getchat, getmessages, readmessages, sendmessage } from "../http/chatApi";


const MessangerComponent = observer(() => {
	const { Activeuser, chats } = useContext(Context)
	const userId = Activeuser.userId
	const [messages, setMessages] = useState([{ id: 0, userId: 0, text: "", createdAt: 0 }])
	const [messagesLength, setMessagesLength] = useState(0)
	const [chats1, setChats] = useState([{ id: 0, host: "", nickname: "", isRead: true }])
	const [nickname, setNickneme] = useState('')
	const [text, setText] = useState('')
	const [scr, setScr] = useState(true)
	const [offset, setOffset] = useState(30)
	const [loading, setLoading] = useState(false)
	const [idIntervals, setIdIntervals] = useState(0)
	const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	function scrollMessagesToBottom() {
		setTimeout(() => {
			let element = document.getElementsByClassName("scrollElement")[0]
			element.scrollIntoView()
		}, 200)
	}

	function messagedate(message) {
		let date = new Date(message.createdAt)
		let hh = String(date.getHours())
		let mm = String(date.getMinutes())
		return hh + ":" + mm
	}
	function comparison(i) {
		if (messages.length > 0) {
			let dateA = new Date(messages[i].createdAt)
			if (i < messages.length) {
				if (i == messages.length - 1) {
					return (String(dateA.getDate()) + monthNames[dateA.getMonth()])
				}
				let dateB = new Date(messages[i + 1].createdAt)
				let a = dateA.getDate()
				let b = dateB.getDate()
				if (a != b) {
					return (String(a) + monthNames[dateA.getMonth()])
				}
				return false
			}
			return false
		}
		return false
	}
	function isRead(obj) {
		let style = {}
		if (obj.userId === Activeuser.userId) {
			if (obj.isRead) {
				style = { alignSelf: "flex-end" }
			} else {
				style = { alignSelf: "flex-end", backgroundColor: "gray" }
			}
		} else {
			if (obj.isRead) {
				
				style = { alignSelf: "flex-start", backgroundColor: "white"}
			} else {
				style = { alignSelf: "flex-start", backgroundColor: "gray" }
			}
		}
		return style
	}
	function read(arr) {
		let idarray = []
		let messagearr = messages
		for (let i = 0; i < arr.length; i++) {
			if (!arr[i].isRead && arr[i].userId !== Activeuser.userId) {
				idarray.push(arr[i].id)
				messagearr[i].isRead = true
			}
			if (idarray.length > 0) {
				setMessages(messagearr)
				return readmessages(idarray)

			}
		}
	}

	useEffect(() => {
		clearInterval(idIntervals)
		read(messages)
		function interval() {
			getmessages(chats.selectedChat.id, 0).then(result => {
				let res = result.data
				if (res[0] != messages[0] && messages.length > 1) {
					setMessages(res)
					scrollMessagesToBottom()
					setOffset(30)
				}
			})
		}

		setIdIntervals(setInterval(() => { interval() }, 3500))
	}, [messages[0]])

	useEffect(() => {
		function messageResponse() {
			getmessages(chats.selectedChat.id, 0).then(result => {
				setMessages(result.data)
				scrollMessagesToBottom()
				setMessagesLength(result.headers.get("Length"))
			})
		}
		messageResponse()
	}, [chats.selectedChat])

	useEffect(() => {
		if (loading) {
			if (messages.length < messagesLength) {
				getmessages(chats.selectedChat.id, offset).then(result => {
					setOffset(prevState => prevState + 30)
					setMessages([...messages, ...result.data])
					setMessagesLength(result.headers.get("Length"))
				})
			}
		}
		setLoading(false)
	}, [loading])

	useEffect(() => {
		setTimeout(() => {
			document.getElementsByClassName("message__section")[0].addEventListener("scroll", scrollHandler)
			console.log(loading)
			return function () {
				document.getElementsByClassName("message__section")[0].removeEventListener("scroll", scrollHandler)
			}
		}, 400)
	}, [])

	function click(chat) {
		chats.setSelectedChat(chat)
		async function response() {
			getmessages(chats.selectedChat.id, 0).then(result => {
				setMessages(result.data)
				scrollMessagesToBottom()
				setOffset(30)
				setMessagesLength(result.headers.get("Length"))
			})
		}
		response()
		setScr(true)
		setLoading(false)
	}

	const click1 = async (e) => {
		e.preventDefault()
		await sendmessage(text, Activeuser.userId, chats.selectedChat.id)
		getmessages(chats.selectedChat.id, 0).then(result => {
			setMessages(result.data)
			scrollMessagesToBottom()
			setOffset(30)
		})
		setText("")
		setScr(true)
		setLoading(false)
	}
	const scrollHandler = (e) => {
		if (document.getElementsByClassName("message__section")[0].scrollTop < 150) {
			if (!loading) {
				setLoading(true)
			}


		}
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
						<div key={chat.id} onClick={() => { click(chat) }} className={chat.id === chats.selectedChat.id ? "ChatCard active" : "ChatCard"} >{chat.host === Activeuser.userNickname ? chat.nickname : chat.host}</div>
					)
				}
			</div>
			<div className="messagepanel" >
				{<div className="messagepanelheader">{chats.selectedChat.host === Activeuser.userNickname ? chats.selectedChat.nickname : chats.selectedChat.host}</div>}
				<section className="message__section"  >
					<div className="messages">
						<div className="scrollElement" ></div>

						{(messages.map(function (message, index) {
							return (
								<React.Fragment key={message.id}>
									<div className="message" style={isRead(message)}>
										{message.text}
										<br></br>
										<span className="data">{messagedate(message)}</span>
									</div>
									{comparison(index) ? <div >{comparison(index)}</div> : ""}
								</React.Fragment>
							)
						})
						)}
						<div className="qeq"></div>
					</div>
				</section>
				{
					chats.selectedChat ? <form className="sendmessage">
						<input type="text" className="sendmessage-input" value={text} onChange={e => setText(e.target.value)}></input>
						<button onClick={click1} className="sendmessage-button">отправить</button>
					</form> : ""
				}
			</div >
		</>
	)
})



export default MessangerComponent