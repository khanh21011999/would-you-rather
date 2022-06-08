import React, { CSSProperties, useEffect, useState } from 'react'
import Header from '../../component/header/header'
import styles from './home.module.css'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import { LocationParams, questionI, UserI } from '../../interface/interface'
import { useSelector, useDispatch } from 'react-redux'
import {
	addAnsweredQuestion,
	AppDispatch,
	initialAnsweredQuestion,
	initialunAnsweredQuestion,
	RootState,
} from '../../redux/store'
import UserQuestion from '../../component/user-question/user-question'

export default function Home() {
	const params: LocationParams = useLocation()

	const user: UserI[] = useSelector((state: RootState) => state.user)
	const dispatch: AppDispatch = useDispatch()
	const question: questionI[] = useSelector(
		(state: RootState) => state.question,
	)
	const currentUser = useSelector((state: RootState) => state.auth)
	const answeredQuestion = useSelector(
		(item: RootState) => item.answeredQuestion,
	)
	const unAnswerQuestion = useSelector(
		(state: RootState) => state.unAnsweredQuestion,
	)

	const [answeredQues, setAnsweredQues] = useState([])
	const [unAnsweredQues, setUnAnsweredQues] = useState([])
	const [answeredSelected, setAnsweredSelected] = useState(false)
	const getAnsweredQuestion = (): questionI[] => {
		const answerQues: questionI[] = []
		Object.entries(currentUser.userInfo.answers).forEach((item: any, index) => {
			question.forEach((questionItem: any, questionIndex) => {
				const currUser = user.filter(
					(item: UserI) => item.id === questionItem.author,
				)
				if (item[0] === questionItem.id) {
					answerQues.push({
						...questionItem,
						selectedValue: item[1],
						author: currUser,
					})
				}
			})
		})
		return answerQues
	}

	const getUnAnsweredQuestion = (): questionI[] => {
		const unAnsweredQues: questionI[] = question.map((itemQus, index) => {
			const currUser = user.filter((item: UserI) => item.id === itemQus.author)
			return {
				...itemQus,
				author: currUser,
			}
		})

		Object.entries(currentUser.userInfo.answers).forEach((item: any, index) => {
			unAnsweredQues.forEach((questionItem: any, questionIndex) => {
				if (item[0] === questionItem.id) {
					unAnsweredQues.splice(questionIndex, 1)
				}
			})
		})

		const formatted = unAnsweredQues.map((itemQues, index) => {
			return {
				...itemQues,
			}
		})
		return formatted
	}
	console.log('userlist', user)

	// const formattedAnswerQuestion = () => {
	// 	console.log(Object.entries(currentUser.userInfo.answers))

	// 	currentUser.userInfo.answers.forEach((item,index)=>{

	// 	})
	// }

	useEffect(() => {
		dispatch(initialAnsweredQuestion(getAnsweredQuestion()))
		dispatch(initialunAnsweredQuestion(getUnAnsweredQuestion()))
	}, [])

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
				{answeredSelected &&
					answeredQuestion.map((item: questionI, index: number) => {
						return (
							<UserQuestion questionItem={item} key={Math.random()} isAnswer />
						)
					})}
				{!answeredSelected &&
					unAnswerQuestion.map((item: questionI, index: number) => {
						return <UserQuestion questionItem={item} key={Math.random()} />
					})}
			</div>
		</div>
	)
}
