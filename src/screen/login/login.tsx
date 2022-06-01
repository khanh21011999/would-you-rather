/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "../../component/dropdown/dropdown";
import Header from "../../component/header/header";
import { UserI } from "../../interface/interface";
import {
  AppDispatch,
  getAllQuestion,
  loggedIn,
  RootState,
} from "../../redux/store";
import styles from "./login.module.css";
import defaultAvatar from "../../assets/defaultAvatar.png";
import { Link, useNavigate } from "react-router-dom";
import { _getQuestions } from "../../data/__DATA__";
import { useDispatch } from "react-redux";
import { getAllUser } from "../../redux/store";
interface LoginI {}

export default function LoginScreen() {
  const [currentSelectUser, setCurrentSelectUser] = useState<UserI>();
  const [isHoverLogin, setIsHoverLogin] = useState<boolean>(false);
  const [isCLickLogin, setClickLogin] = useState<boolean>(false);
  const prevUser = useRef<UserI>();
  const user = useSelector((state: RootState) => {
    return state.user;
  });

  const question = useSelector((state: RootState) => {
    return state.question;
  });
  const authStatus = useSelector((state: RootState) => {
    return state.auth.isLogin;
  });
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllQuestion());
  }, []);
  const navToHome = () => {
    if (currentSelectUser) {
      dispatch(loggedIn(currentSelectUser));
      nav("home-screen/" + currentSelectUser?.id, {
        state: {
          user: currentSelectUser,
        },
      });
    }
  };

  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <Header />
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
          <Dropdown
            setCurrentSelectUser={setCurrentSelectUser}
            user={user}
            setClickLogin={setClickLogin}
          />
          {!currentSelectUser && isCLickLogin && (
            <div className={styles.warningText}>*Please select an user</div>
          )}
          <div
            onMouseEnter={() => setIsHoverLogin(true)}
            onMouseLeave={() => {
              setIsHoverLogin(false);
            }}
            onClick={() => {
              navToHome();
              setClickLogin(true);
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
