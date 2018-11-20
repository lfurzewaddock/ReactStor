import React from "react";

import siteLogo from "../../../../../assets/images/placeholder-logo-light-100x127-trans.png";
import styles from "./logo.module.css";

const logo = () => (
  <div className={styles.Logo}>
    <img src={siteLogo} alt="ReactStor" />
  </div>
);


export default logo;
