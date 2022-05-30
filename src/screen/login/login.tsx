/* eslint-disable jsx-a11y/alt-text */
import React, { CSSProperties, useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "../../component/dropdown/dropdown";
import Header from "../../component/header/header";
import { UserI } from "../../interface/interface";
import { RootState } from "../../redux/store";
import styles from "./login.module.css";
import defaultAvatar from "../../assets/defaultAvatar.png";
import { Link, useNavigate } from "react-router-dom";
import { _getQuestions } from "../../data/__DATA__";
interface LoginI {}

const CONTAINER: CSSProperties = {};

export default function LoginScreen() {
  const [currentSelectUser, setCurrentSelectUser] = useState<UserI>();
  const [isHoverLogin, setIsHoverLogin] = useState<boolean>(false);
  const user = useSelector((state: RootState) => {
    return state.user;
  });
  const question = useSelector((state: RootState) => {
    return state.question;
  });
  const authStatus = useSelector((state: RootState) => {
    return state.auth.isLogin;
  });
  console.log("get question", _getQuestions());
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <Header currentUser={currentSelectUser} isLogin={authStatus} />
      <div className={styles.loginWrapper}>
        <div className={styles.leftItemWrapper}>
          <div className={styles.loginHeaderText}>Would you rather?</div>

          <img
            className={styles.mainAvatar}
            src={
              currentSelectUser?.avatarURL
                ? currentSelectUser?.avatarURL
                : defaultAvatar
            }
          ></img>
        </div>

        <div className={styles.rightItemWrapper}>
          <Dropdown setCurrentSelectUser={setCurrentSelectUser} user={user} />
          <div
            onMouseEnter={() => setIsHoverLogin(true)}
            onMouseLeave={() => {
              setIsHoverLogin(false);
            }}
            onClick={() => {
              console.log("click");
              nav("home-screen/" + currentSelectUser?.id, {
                state: {
                  user: currentSelectUser,
                },
              });
            }}
            className={styles.loginButton}
          >
            <div
              className={isHoverLogin ? styles.loginTextActive : styles.login}
            >
              Let me answer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
