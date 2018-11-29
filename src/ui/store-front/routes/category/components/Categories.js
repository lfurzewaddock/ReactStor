import React from "react";

import Category from "./Category";

import styles from "./categories.module.css";

const categories = () => (
  <div className={styles.Categories}>
    <h1>Hello, Categories!</h1>
    <Category />
  </div>
);

export default categories;
