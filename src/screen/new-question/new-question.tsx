/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { questionI, UserI } from '../../interface/interface'
import styles from './styles.module.css'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import Header from '../../component/header/header'
import { useNavigate } from 'react-router'
import {
	addNewQuestion,
	AppDispatch,
	modifyQuestion,
	RootState,
} from '../../redux/store'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { LocationParams } from '../../interface/interface'
import { useState } from 'react'
import { generateUID } from '../../data/__DATA__'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
interface UserQuestionI {
	currentUser?: UserI
}
export default function NewQuestion({ currentUser }: UserQuestionI) {
	const [isSelectFirst, setSelectFirst] = useState(0)
	const [options, setOptions] = useState({
		optionOne: {
			vote: [],
			text: '',
		},
		optionTwo: {
			vote: [],
			text: '',
		},
	})
	const user = useSelector((state: RootState) => state.user)
	const onModifyUserList = (data: any) => {
		const newData = _.cloneDeep(user)
		newData.forEach((item, index) => {
			if (item.id === currAuth.id) {
				item.questions.push(data)
			}
		})
		return newData
	}

	const selectedUser: UserI = useSelector(
		(state: RootState) => state.auth.userInfo,
	)
	const dispatch: AppDispatch = useDispatch()
	const onAddNewQuestion = () => {
		const newQuestion = {
			author: selectedUser?.id,
			id: generateUID(),
			optionOne: options.optionOne,
			optionTwo: options.optionTwo,
			timestamp: Date.now(),
		}

		dispatch(modifyQuestion(onModifyUserList(generateUID())))
		dispatch(addNewQuestion(newQuestion))
		nav(-1)
	}
	const nav = useNavigate()
	const currAuth: UserI = useSelector((state: RootState) => state.auth.userInfo)

	const ChoiceOptions = () => {
		return (
			<div className={styles.choiceOptionContainer}>
				<input
					onChange={(e) => {
						const newOption = {
							...options,
							optionOne: {
								...options.optionOne,
								text: e.target.value,
							},
						}

						setOptions(newOption)
					}}
					defaultValue={options.optionOne.text}
					placeholder="First opinion"
					className={[styles.choiceContainer].join(' ')}
				/>
				<input
					onChange={(e) => {
						const newOption = {
							...options,
							optionTwo: {
								...options.optionTwo,
								text: e.target.value,
							},
						}
						setOptions(newOption)
					}}
					placeholder="Second opinion"
					value={options.optionTwo.text}
					className={[styles.choiceContainer].join(' ')}
				></input>
			</div>
		)
	}
	return (
		<div>
			<Header />
			<div className={styles.container}>
				<div className={styles.leftSideContainer}>
					<img src={selectedUser?.avatarURL} className={styles.avatarImage} />
					<div className={styles.userAsked}>{selectedUser?.name} </div>
				</div>
				<div className={styles.questionContainer}>
					<div className={styles.leftTriangle} />
					<div className={styles.questionDetailContainer}>
						<div className={styles.questionTextDetailContainer}>
							<div className={styles.wouldYouRatherText}>Would you rather?</div>
						</div>

						{ChoiceOptions()}
						<div className={styles.bottomContainer}>
							<div
								onClick={() => {
									onAddNewQuestion()
								}}
								className={styles.answerText}
							>
								<div>Add this question</div>
								<MdOutlineArrowForwardIos className={styles.arrowIcon} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
