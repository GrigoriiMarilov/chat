
import { observer } from "mobx-react-lite"
import React from "react"

import ChatBar from "../components/ChatBar"
import MesPanel from "../components/MesPanel"



const Messanger = observer(() => {

	return (
		<div className="ChatPage">
			<ChatBar />
			<MesPanel />
		</div>
	)
})

export default Messanger