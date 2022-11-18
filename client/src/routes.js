import Authentication from "./pages/authentication";
import Messanger from "./pages/messanger";

import { LOGIN_ROUTE, MESSAGE_ROUTE, REGISTRATION_ROUTE } from "./utils/const";
export const publicRoutes = [
	{
		path: REGISTRATION_ROUTE,
		Component: <Authentication />
	},
	{
		path: LOGIN_ROUTE,
		Component: <Authentication />
	}


]
export const authRoutes = [
	{
		path: MESSAGE_ROUTE,
		Component: <Messanger />
	}

]