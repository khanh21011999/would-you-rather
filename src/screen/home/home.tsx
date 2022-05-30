import React from "react";
import Header from "../../component/header/header";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { UserI } from "../../interface/interface";
export interface LocationParams {
  pathname: string;
  state: any;
  search: string;
  hash: string;
  key: string;
}

export default function Home() {
  const params: LocationParams = useLocation();
  const user: UserI = params.state.state;

  const nav = useNavigate();
  return (
    <div>
      <Header isLogin />
      <div className={styles.unanswerQuestionContainer}></div>
    </div>
  );
}
