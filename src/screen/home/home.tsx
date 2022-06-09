/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line react-hooks/exhaustive-deps
import { useEffect, useState } from 'react'
import Header from '../../component/header/header'
import styles from './home.module.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { questionI, UserI } from '../../interface/interface'
import { useSelector, useDispatch } from 'react-redux'
import {
	AppDispatch,
	initialAnsweredQuestion,
	initialunAnsweredQuestion,
	RootState,
} from '../../redux/store'
import UserQuestion from '../../component/user-question/user-question'
import _ from 'lodash'

export default function Home() {
	const { userId } = useParams()
	const nav = useNavigate()
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

	const [answeredSelected, setAnsweredSelected] = useState(false)
	const getAnsweredQuestion = (): questionI[] => {
		const answerQues: questionI[] = []
		Object.entries(currentUser.userInfo.answers).forEach((item: any) => {
			question.forEach((questionItem: any) => {
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
		return _.orderBy(answerQues, [(data) => data.timestamp, 'desc'])
	}

	const getUnAnsweredQuestion = (): questionI[] => {
		const unAnsweredQues: questionI[] = question.map((itemQus) => {
			const currUser = user.filter((item: UserI) => item.id === itemQus.author)
			return {
				...itemQus,
				author: currUser,
			}
		})

		Object.entries(currentUser.userInfo.answers).forEach((item: any) => {
			unAnsweredQues.forEach((questionItem: any, questionIndex) => {
				if (item[0] === questionItem.id) {
					unAnsweredQues.splice(questionIndex, 1)
				}
			})
		})

		const formatted = unAnsweredQues.map((itemQues) => {
			return {
				...itemQues,
			}
		})
		const sortedFormatted = _.orderBy(formatted, [
			(data) => data.timestamp,
			'desc',
		])
		return sortedFormatted.reverse()
	}

	const checkValidUser = () => {
		let validValue = false
		user.forEach((item) => {
			if (item.id === userId) {
				validValue = true
			}
		})
		return validValue
	}
	useEffect(() => {
		validNavigation()
	}, [])

	const validNavigation = () => {
		if (checkValidUser()) {
			return
		} else {
			nav('/not-found')
		}
		return
	}
	console.log('answer quest', getUnAnsweredQuestion())
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
					answeredQuestion.map((item: questionI) => {
						return (
							<UserQuestion questionItem={item} key={Math.random()} isAnswer />
						)
					})}
				{!answeredSelected &&
					unAnswerQuestion.map((item: questionI) => {
						return <UserQuestion questionItem={item} key={Math.random()} />
					})}
			</div>
		</div>
	)
}
