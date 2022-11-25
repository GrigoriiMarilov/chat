
import { observer } from "mobx-react-lite"
import React from "react"


import MessangerComponent from "../components/MessangerComponent"



const Messanger = observer(() => {

	return (
		<div className="ChatPage">
			<MessangerComponent />
		</div>
	)
})

export default Messanger