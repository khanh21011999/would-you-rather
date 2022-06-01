/* eslint-disable jsx-a11y/alt-text */
import React, { CSSProperties, useState } from "react";
import styles from "./dropdown.module.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { UserI } from "../../interface/interface";
import { useDispatch } from "react-redux";
import { addCurrentUser, AppDispatch } from "../../redux/store";

interface DropdownI {
  style?: CSSProperties;
  setCurrentSelectUser: Function;
  user?: UserI[];
  setClickLogin: Function;
}
export default function Dropdown({
  style,
  setCurrentSelectUser,
  user,
  setClickLogin,
}: DropdownI) {
  const [isShowDropdown, setShowDropdown] = useState<Boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className={styles.containerDropdown}>
      <div
        onClick={() => {
          setShowDropdown(!isShowDropdown);
        }}
        className={styles.dropdownTrigger}
      >
        <div className={styles.currentUserText}>
          {currentUser ? currentUser : "-- Select user --"}
        </div>
        <div className={isShowDropdown ? styles.iconDropdownRotate : ""}>
          <IoMdArrowDropdown size={"4vh"} />
        </div>
      </div>

      <div
        className={isShowDropdown ? styles.dropdownMenuActive : styles.dropdown}
      >
        {user?.map((item, index) => {
          return (
            <div
              className={styles.itemWrapper}
              onClick={() => {
                setCurrentUser(item.name);
                setShowDropdown(false);
                setCurrentSelectUser(item);
                dispatch(addCurrentUser(item));
                setClickLogin(true);
              }}
            >
              <img
                className={
                  isShowDropdown ? styles.avatarItemActive : styles.avatarItem
                }
                src={item.avatarURL}
              />
              <div
                className={
                  isShowDropdown
                    ? styles.itemDropdownActive
                    : styles.itemDropdown
                }
              >
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
