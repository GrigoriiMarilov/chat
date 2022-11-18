import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import UserStore from './store/UserStore';
import App from './App';
import "./index.css";
import ChatStore from './store/ChatStore';
import MessageStore from "./store/MessageStore"

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Context.Provider value={{
		Activeuser: new UserStore(),
		chats: new ChatStore(),
		controler: new MessageStore()
	}}>
		<App />
	</Context.Provider>


);


