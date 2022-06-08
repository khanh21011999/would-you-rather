import React from 'react'
import Header from '../../component/header/header'
import styles from './styles.module.css'
export default function NotFoundScreen() {
	return (
		<div>
			<Header />
			<div className={styles.container}>
				<div className={styles.notFound}>404 NOT FOUND :(</div>
			</div>
		</div>
	)
}
