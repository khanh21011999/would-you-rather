/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { UserI } from '../../interface/interface'
import styles from './styles.module.css'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import Header from '../../component/header/header'
import { useNavigate } from 'react-router'
import {
	addUserAnsweredQuestion,
	AppDispatch,
	modifyUser,
	RootState,
} from '../../redux/store'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { LocationParams } from '../../interface/interface'
import { useState } from 'react'
import { capitalizeFirstLetter } from '../../utilities/format-receive-data'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
interface UserQuestionI {
	currentUser?: UserI
}
export default function UserQuestionDetail({ currentUser }: UserQuestionI) {
	const { state }: LocationParams = useLocation()
	const [isSelectFirst, setSelectFirst] = useState(0)
	const [isAnswer, setAnswer] = useState(!!state.questionDetail.selectedValue)
	const [answerChoice, setCurrentAnswer] = useState('')
	const [vote, setVote] = useState({
		optionOne: 0,
		optionTwo: 0,
	})
	const selectedUser: UserI = state.selectedUserAsk

	const dispatch: AppDispatch = useDispatch()
	const nav = useNavigate()
	const currAuth: UserI = useSelector((state: RootState) => state.auth.userInfo)
	const onModifyUserList = (data: any) => {
		const newUser = user.map((item, index) => {
			if (item.id === currAuth.id) {
				return {
					...item,
					answers: {
						...item.answers,
						[data[0][0]]: data[0][1],
					},
				}
			}
			return item
		})
		return newUser
	}
	const onAnsweredQuestion = (clickFirst: boolean) => {
		if (clickFirst) {
			dispatch(
				modifyUser(
					onModifyUserList(
						Object.entries({ [state.questionDetail.id]: 'optionOne' }),
					),
				),
			)
			dispatch(
				addUserAnsweredQuestion({ [state.questionDetail.id]: 'optionOne' }),
			)
		} else {
			dispatch(
				modifyUser(
					onModifyUserList(
						Object.entries({ [state.questionDetail.id]: 'optionTwo' }),
					),
				),
			)
			dispatch(
				addUserAnsweredQuestion({ [state.questionDetail.id]: 'optionTwo' }),
			)
		}
	}
	const user: UserI[] = useSelector((state: RootState) => state.user)
	useEffect(() => {
		getTotalAnswer()
		getCurrentUserAns()
	}, [])
	const getCurrentUserAns = () => {
		if (currAuth.answers[state.questionDetail.id] !== undefined) {
			setCurrentAnswer(currAuth.answers[state.questionDetail.id])
		}
	}
	const getTotalAnswer = () => {
		user.forEach((item, index) => {
			Object.entries(item.answers).forEach((item, index) => {
				if (item[0] === state.questionDetail.id) {
					if (item[1] === 'optionOne') {
						setVote((before) => {
							return {
								...before,
								optionOne: vote.optionOne + 1,
							}
						})
					} else {
						setVote((before) => {
							return {
								...before,
								optionTwo: vote.optionTwo + 1,
							}
						})
					}
				}
			})
		})
	}
	console.log('user', currAuth)
	console.log('ques', state.questionDetail)
	const showPercent = () => {
		console.log('option1', vote.optionOne)
		console.log('option2', vote.optionTwo)
		if (answerChoice === 'optionTwo') {
			return (
				Math.round(
					((vote.optionTwo / (vote.optionOne + vote.optionTwo)) * 100 +
						Number.EPSILON) *
						100,
				) / 100
			)
		}
		if (answerChoice === 'optionOne') {
			return (
				Math.round(
					((vote.optionOne / (vote.optionOne + vote.optionTwo)) * 100 +
						Number.EPSILON) *
						100,
				) / 100
			)
		}
		return -1
	}
	console.log('vote', vote)
	const ChoiceOptions = (optionOne: string, optionTwo: string) => {
		return (
			<div className={styles.choiceOptionContainer}>
				<div
					onClick={() => {
						setSelectFirst(1)
						setCurrentAnswer('optionOne')
						onAnsweredQuestion(true)
					}}
					className={[
						styles.choiceContainer,
						(isSelectFirst !== 0 || isAnswer) && styles.disableOpinion,
						isSelectFirst === 0 && styles.setHover,

						isSelectFirst === 1 ||
						state.questionDetail.selectedValue === 'optionOne'
							? styles.selectedContainer
							: '',
					].join(' ')}
				>
					<div className={styles.optionTextDetail}>
						{capitalizeFirstLetter(optionOne)}
					</div>
				</div>
				<div
					onClick={() => {
						setSelectFirst(2)
						setCurrentAnswer('optionTwo')
						onAnsweredQuestion(false)
					}}
					className={[
						styles.choiceContainer,
						(isSelectFirst !== 0 || isAnswer) && styles.disableOpinion,
						isSelectFirst === 0 && styles.setHover,
						isSelectFirst === 2 ||
						state.questionDetail.selectedValue === 'optionTwo'
							? styles.selectedContainer
							: '',
					].join(' ')}
				>
					<div className={styles.optionTextDetail}>
						{capitalizeFirstLetter(optionTwo)}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div>
			<Header />
			<div className={styles.container}>
				<div className={styles.leftSideContainer}>
					<img
						src={state.questionDetail.author[0].avatarURL}
						className={styles.avatarImage}
					/>
					<div className={styles.userAsked}>{selectedUser?.name} </div>
				</div>
				<div className={styles.questionContainer}>
					<div className={styles.leftTriangle} />
					<div className={styles.questionDetailContainer}>
						<div className={styles.questionTextDetailContainer}>
							<div className={styles.wouldYouRatherText}>Would you rather?</div>
						</div>
						{ChoiceOptions(
							state.questionDetail.optionOne.text,
							state.questionDetail.optionTwo.text,
						)}

						<div className={styles.bottomContainer}>
							{vote.optionOne + vote.optionTwo === 0 ? (
								<div>Your answer is first</div>
							) : (
								<div>
									{(isSelectFirst !== 0 || isAnswer) && (
										<div className={styles.answerText}>
											<div className={styles.bottomText}>Tip: </div>
											<div className={styles.bottomTextDetail}>
												You have same opinion as
												<div className={styles.bottomPercent}>
													{' '}
													{showPercent()}%{' '}
												</div>
												users while other one was chosen by{' '}
												<div className={styles.bottomPercentOther}>
													{' '}
													{100 - showPercent()}%{' '}
												</div>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
