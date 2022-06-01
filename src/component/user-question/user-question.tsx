/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { UserI } from "../../interface/interface";
import styles from "./user-question.module.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
interface UserQuestionI {
  currentUser: UserI;
}
export default function UserQuestion({ currentUser }: UserQuestionI) {
  const nav = useNavigate();
  const currAuth: UserI = useSelector(
    (state: RootState) => state.auth.userInfo
  );
  const id = 1234;
  return (
    <div className={styles.container}>
      <div className={styles.leftSideContainer}>
        <img src={currentUser.avatarURL} className={styles.avatarImage} />
        <div className={styles.userAsked}>{currentUser.name} </div>
      </div>
      <div className={styles.questionContainer}>
        <div className={styles.leftTriangle} />
        <div className={styles.questionDetailContainer}>
          <div className={styles.questionTextDetailContainer}>
            <div className={styles.wouldYouRatherText}>Would you rather</div>
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.questionBrief}>
              Have bad memmory or good?
            </div>
            <div
              onClick={() => {
                nav(`/questions/${id}`, {
                  state: {
                    selectedUserAsk: currentUser,
                  },
                });
              }}
              className={styles.answerText}
            >
              <div>Answer</div>
              <MdOutlineArrowForwardIos className={styles.arrowIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
