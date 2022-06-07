/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { UserI } from '../../interface/interface'
import styles from './header.module.css'
import { useSelector } from 'react-redux'
import { loggedOut, RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

interface HeaderI {}
export default function Header() {
	const currentUser: UserI = useSelector(
		(state: RootState) => state.auth.userInfo,
	)
	const homeRow = [
		{
			name: 'Home',
			route: `/home-screen/${currentUser?.id}`,
		},
		{
			name: 'New Question',
			route: `/add`,
		},
		{
			name: 'Leaderboard',
			route: `/leaderboard/`,
		},
	]
	const nav = useNavigate()
	const auth = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch()

	return (
		<div className={styles.headerWrapper}>
			<div className={styles.headerContainer}>
				{homeRow.map((item, index) => {
					return (
						<div className={styles.leftRowHeaderContainer}>
							<div
								onClick={() => {
									nav(item.route)
								}}
								className={styles.headerItem}
							>
								{item.name}
							</div>
						</div>
					)
				})}
			</div>
			{auth.isLogin && (
				<div className={styles.headerUserRightContainer}>
					<div className={styles.userNameRight}>
						Hello<div className={styles.userName}>{auth.userInfo.name}</div>
					</div>
					<img
						className={styles.userAvatarRight}
						src={auth.userInfo.avatarURL}
					></img>
					<div
						onClick={() => {
							dispatch(loggedOut())
							nav('/')
						}}
						className={styles.logout}
					>
						Logout
					</div>
				</div>
			)}
		</div>
	)
}
