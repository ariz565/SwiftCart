import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";

import styles from "./styles.module.scss";

const HasIconButton = (props) => {
  return (
    <button {...props} className={styles.button}>
      <p className={styles.button__title}>{props.children}</p>
      <div className={styles.svg__wrap}>
        <BiRightArrowAlt />
      </div>
    </button>
  );
};

export default HasIconButton;
