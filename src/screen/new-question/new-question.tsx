/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { UserI } from '../../interface/interface'
import styles from './styles.module.css'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import Header from '../../component/header/header'
import { useNavigate } from 'react-router'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { LocationParams } from '../../interface/interface'
import { useState } from 'react'
interface UserQuestionI {
	currentUser?: UserI
}
export default function NewQuestion({ currentUser }: UserQuestionI) {
	const [isSelectFirst, setSelectFirst] = useState(0)
	const selectedUser: UserI = useSelector(
		(state: RootState) => state.auth.userInfo,
	)
	const nav = useNavigate()
	const currAuth: UserI = useSelector((state: RootState) => state.auth.userInfo)
	console.log('selected', selectedUser)
	const ChoiceOptions = () => {
		return (
			<div className={styles.choiceOptionContainer}>
				<input
					placeholder="First opinion"
					className={[styles.choiceContainer].join(' ')}
				></input>
				<input
					placeholder="Second opinion"
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
						<ChoiceOptions />
						<div className={styles.bottomContainer}>
							<div className={styles.answerText}>
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
