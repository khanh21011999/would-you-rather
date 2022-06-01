/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { UserI } from "../../interface/interface";
import styles from "./styles.module.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Header from "../../component/header/header";
import { useNavigate } from "react-router";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { LocationParams } from "../../interface/interface";
import { useState } from "react";
interface UserQuestionI {
  currentUser?: UserI;
}
export default function UserQuestionDetail({ currentUser }: UserQuestionI) {
  const { state }: LocationParams = useLocation();
  const [isSelectFirst, setSelectFirst] = useState(0);
  const selectedUser: UserI = state.selectedUserAsk;
  const nav = useNavigate();
  const currAuth: UserI = useSelector(
    (state: RootState) => state.auth.userInfo
  );
  console.log("selected", selectedUser);
  const ChoiceOptions = () => {
    return (
      <div className={styles.choiceOptionContainer}>
        <div
          onClick={() => {
            setSelectFirst(1);
          }}
          className={[
            styles.choiceContainer,
            (isSelectFirst === 2 || isSelectFirst === 0) && styles.setHover,

            isSelectFirst === 1 ? styles.selectedContainer : "",
          ].join(" ")}
        >
          <div className={styles.optionTextDetail}>ABCDER</div>
        </div>
        <div
          onClick={() => {
            setSelectFirst(2);
          }}
          className={[
            styles.choiceContainer,
            (isSelectFirst === 1 || isSelectFirst === 0) && styles.setHover,
            isSelectFirst === 2 ? styles.selectedContainer : "",
          ].join(" ")}
        >
          <div className={styles.optionTextDetail}>asdasd</div>
        </div>
      </div>
    );
  };
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
                <div>Submit</div>
                <MdOutlineArrowForwardIos className={styles.arrowIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
