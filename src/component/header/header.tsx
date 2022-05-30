/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { UserI } from "../../interface/interface";
import styles from "./header.module.css";

interface HeaderI {
  isLogin?: boolean;
  currentUser?: UserI | undefined;
}
export default function Header({ isLogin, currentUser }: HeaderI) {
  const homeRow = ["Home", "New Question", "Leaderboard"];
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        {homeRow.map((item, index) => {
          return (
            <div className={styles.leftRowHeaderContainer}>
              <div className={styles.headerItem}>{item}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.headerUserRightContainer}>
        <div className={styles.userNameRight}>Hello Abcd</div>
        <div className={styles.userAvatarRightContainer}>
          <img
            className={styles.userAvatarRight}
            src="https://learn.getgrav.org/system/images/media/thumb-jpg.png"
          ></img>
        </div>
      </div>
    </div>
  );
}
