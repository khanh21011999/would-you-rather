import React from "react";
import Header from "../../component/header/header";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
export default function Detail() {
  const list = [1121, 2323, 2323, 232];
  const nav = useNavigate();
  return (
    <div>
      <Header isLogin />
      <div>detail</div>
      <div className={styles.unanswerQuestionContainer}></div>
      <ul>
        {list.map((item) => {
          return (
            <li
              onClick={() => {
                nav("/home-screen/" + item);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
