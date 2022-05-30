/* eslint-disable jsx-a11y/alt-text */
import React, { CSSProperties, useState } from "react";
import styles from "./dropdown.module.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { UserI } from "../../interface/interface";

interface DropdownI {
  style?: CSSProperties;
  setCurrentSelectUser: Function;
  user?: UserI[];
}
export default function Dropdown({
  style,
  setCurrentSelectUser,
  user,
}: DropdownI) {
  const [isShowDropdown, setShowDropdown] = useState<Boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>("");

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
