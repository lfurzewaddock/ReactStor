import React from "react";

// TODO: Fix tests with loading images
// import imgPlaceholder300x300white from
// "../../../../../assets/images/placeholder-300x300-white.png";

import styles from "./category.module.css";

const category = () => (
  <div className={styles.Category}>
    <h1>Main Title</h1>
    <h1>Sub-Title</h1>
    {/* <img src={imgPlaceholder300x300white} alt="placeholder" /> */}
    <button type="submit">Read More</button>
    <p>copy</p>
    <ul>
      <li>list item 1</li>
      <li>list item 2</li>
      <li>list item 3</li>
      <li>list item 4</li>
      <li>list item 5</li>
      <li>list item 6</li>
    </ul>
  </div>
);

export default category;
