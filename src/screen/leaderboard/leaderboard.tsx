import React from 'react'
import Header from '../../component/header/header'
import styles from './leaderboard.module.css'
import { UserI } from '../../interface/interface'

export default function Leaderboard() {
	const dummyItem = [
		{
			name: 'asd',
			borderColor: ' #e7c400',
			pointSize: '36px',
		},
		{
			name: 'asd',
			borderColor: '  #C0C0C0',
			pointSize: '30px',
		},
		{
			name: 'asd',
			borderColor: ' #CD7F32',
			pointSize: '24px',
		},
	]

	return (
		<div>
			<Header />
			<div className={styles.container}>
				<div className={styles.leaderboardText}>Leaderboard</div>
				{dummyItem.map((item, index) => {
					return (
						<LeaderBoardItem
							item={item.name}
							borderColor={item.borderColor}
							pointSize={item.pointSize}
						/>
					)
				})}
			</div>
		</div>
	)
}
const LeaderBoardItem = ({
	item,
	borderColor,
	pointSize,
}: {
	item?: any
	borderColor?: string
	pointSize?: string
}) => {
	return (
		<div className={styles.itemContainer}>
			<div className={styles.userInfo}>
				<div className={styles.avatarContainer}></div>
				<div className={styles.name}>{item}</div>
			</div>
			<div className={styles.dataInfo}>
				<div className={styles.pointDetail}>
					<div className={styles.pointDetailItemContainer}>
						<div className={styles.pointDetailItemText}>Answered Question</div>
						<div className={styles.pointDetailItemNumber}>5</div>
					</div>
					<div className={styles.pointDetailItemContainer}>
						<div className={styles.pointDetailItemText}>Created Question</div>
						<div className={styles.pointDetailItemNumber}>5</div>
					</div>
				</div>
				<div className={styles.pointNumberContainer}>
					<div
						style={{ backgroundColor: borderColor, fontSize: pointSize }}
						className={styles.pointNumber}
					>
						10
					</div>
				</div>
			</div>
		</div>
	)
}
