/* eslint-disable jsx-a11y/alt-text */
import { questionI } from '../../interface/interface'
import styles from './user-question.module.css'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { capitalizeFirstLetter } from '../../utilities/format-receive-data'
interface UserQuestionI {
	questionItem?: questionI
	isAnswer?: boolean
}
export default function UserQuestion({
	questionItem,
	isAnswer,
}: UserQuestionI) {
	const nav = useNavigate()

	const onNav = () => {
		nav(`/questions/${questionItem?.id}`, {
			state: {
				selectedUserAsk: questionItem?.author,
				questionDetail: questionItem,
			},
		})
	}
	return (
		<div className={styles.container}>
			<div className={styles.leftSideContainer}>
				<img
					src={questionItem?.author[0].avatarURL}
					className={styles.avatarImage}
				/>
				<div className={styles.userAsked}>{questionItem?.author[0].name} </div>
			</div>
			<div className={styles.questionContainer}>
				<div className={styles.leftTriangle} />
				<div className={styles.questionDetailContainer}>
					<div className={styles.questionTextDetailContainer}>
						<div className={styles.wouldYouRatherText}>Would you rather</div>
					</div>
					<div className={styles.bottomContainer}>
						<div className={styles.questionBrief}>
							{capitalizeFirstLetter(questionItem?.optionOne.text)} or{' '}
							{questionItem?.optionTwo.text}?
						</div>
						<div
							onClick={() => {
								onNav()
							}}
							className={styles.answerText}
						>
							<div>{isAnswer ? 'Detail' : 'Answer'} </div>
							<MdOutlineArrowForwardIos className={styles.arrowIcon} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
