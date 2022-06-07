import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Link, Outlet, Navigate } from 'react-router-dom'
import { RootState } from '../redux/store'
import UserQuestionDetail from '../screen/detail-user-question/detail-user-question'

import Home from '../screen/home/home'
import Leaderboard from '../screen/leaderboard/leaderboard'
import LoginScreen from '../screen/login/login'
import NewQuestion from '../screen/new-question/new-question'

export default function Navigation() {
	return (
		<Routes>
			<Route path="/" element={<LoginScreen />} />
			<Route element={<PrivateRoute />}>
				<Route path="/home-screen/:userId" element={<Home />}></Route>
				<Route path="/questions/:questionId" element={<UserQuestionDetail />} />
				<Route path="/leaderboard" element={<Leaderboard />} />
				<Route path="/add" element={<NewQuestion />} />
				<Route path="*" element={<div>Nothing here</div>} />
			</Route>

			{/* <Route path='./home-screen/leaderboard' element= */}
		</Routes>
	)
}
const PrivateRoute = () => {
	const auth = useSelector((state: RootState) => state.auth.isLogin)
	return auth ? <Outlet /> : <Navigate to={'/'} />
}
