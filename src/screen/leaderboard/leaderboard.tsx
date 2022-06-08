/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Header from '../../component/header/header'
import styles from './leaderboard.module.css'
import { UserI } from '../../interface/interface'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import _ from 'lodash'

export default function Leaderboard() {
	const user = useSelector((state: RootState) => state.user)
	const formattedData = () => {
		const sortedUser = _.sortBy(user, (data) => {
			return data?.questions?.length + Object.entries(data.answers).length
		})

		return _.reverse(sortedUser).map((item, index) => {
			if (index === 0) {
				return {
					...item,
					borderColor: ' #e7c400',
					pointSize: '36px',
				}
			} else if (index === 1) {
				return {
					...item,
					borderColor: '  #C0C0C0',
					pointSize: '30px',
				}
			} else if (index === 2) {
				return {
					...item,
					borderColor: ' #CD7F32',
					pointSize: '24px',
				}
			}
			return {
				...item,
				borderColor: ' #785633',
				pointSize: '20px',
			}
		})
	}
	console.log(formattedData())
	return (
		<div>
			<Header />
			<div className={styles.container}>
				<div className={styles.leaderboardText}>Leaderboard</div>
				{formattedData().map((item, index) => {
					return (
						<LeaderBoardItem
							item={item}
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
	item?: UserI
	borderColor?: string
	pointSize?: string
}) => {
	return (
		<div className={styles.itemContainer}>
			<div className={styles.userInfo}>
				<img src={item?.avatarURL} className={styles.avatarContainer} />
				<div className={styles.name}>{item?.name}</div>
			</div>
			<div className={styles.dataInfo}>
				<div className={styles.pointDetail}>
					<div className={styles.pointDetailItemContainer}>
						<div className={styles.pointDetailItemText}>Answered Question</div>
						<div className={styles.pointDetailItemNumber}>
							{Object.entries(item?.answers).length}
						</div>
					</div>
					<div className={styles.pointDetailItemContainer}>
						<div className={styles.pointDetailItemText}>Created Question</div>
						<div className={styles.pointDetailItemNumber}>
							{item?.questions?.length}
						</div>
					</div>
				</div>
				<div className={styles.pointNumberContainer}>
					<div
						style={{ backgroundColor: borderColor, fontSize: pointSize }}
						className={styles.pointNumber}
					>
						{item?.questions?.length + Object.entries(item?.answers).length}
					</div>
				</div>
			</div>
		</div>
	)
}
