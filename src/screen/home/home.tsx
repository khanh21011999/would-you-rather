import React, { CSSProperties, useEffect, useState } from 'react'
import Header from '../../component/header/header'
import styles from './home.module.css'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import { LocationParams, questionI, UserI } from '../../interface/interface'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import UserQuestion from '../../component/user-question/user-question'

export default function Home() {
	const params: LocationParams = useLocation()

	const user: UserI[] = useSelector((state: RootState) => state.user)

	const currentUser = useSelector((state: RootState) => state.auth)

	const [answeredQues, setAnsweredQues] = useState([])
	const [unAnsweredQues, setUnAnsweredQues] = useState([])
	const [answeredSelected, setAnsweredSelected] = useState(false)
	console.log('user', user)
	useEffect(() => {}, [unAnsweredQues, answeredQues])
	return (
		<div>
			<Header />
			<div className={styles.questionContainer}>
				<div className={styles.headerContainer}>
					<div
						onClick={() => {
							setAnsweredSelected(false)
						}}
						className={
							answeredSelected ? styles.headerItem : styles.headerItemSelected
						}
					>
						<div
							className={
								!answeredSelected ? styles.selectedItem : styles.unselectedItem
							}
						>
							Unanswered Questions
						</div>
					</div>
					<div
						onClick={() => {
							setAnsweredSelected(true)
						}}
						className={
							answeredSelected ? styles.headerItemSelected : styles.headerItem
						}
					>
						<div
							className={
								answeredSelected ? styles.selectedItem : styles.unselectedItem
							}
						>
							Answered Questions
						</div>
					</div>
				</div>
				{user.map((item: UserI, index: number) => {
					return <UserQuestion currentUser={item} />
				})}
			</div>
		</div>
	)
}
