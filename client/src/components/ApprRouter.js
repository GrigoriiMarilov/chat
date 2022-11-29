
import { observer } from "mobx-react-lite";
import React from "react"
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import { Context } from "..";
import { authRoutes, publicRoutes } from "../routes";




const AppRouter = observer(() => {
	const { Activeuser } = useContext(Context)
	return (
		<Routes>
			{Activeuser.isAuth && authRoutes.map(({ path, Component }) =>
				<Route key={path} path="*" element={Component} exact />
			)}
			{publicRoutes.map(({ path, Component }) =>
				<Route key={path} path={path} element={Component} exact />
			)}
			<Route path="*" element={<Navigate to="/login" replace />} exact />
		</Routes>
	)
})
export default AppRouter