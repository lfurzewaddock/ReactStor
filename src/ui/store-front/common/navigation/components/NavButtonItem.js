import React from "react";
import PropTypes from "prop-types";

import styles from "./nav-button-item.module.css";

const navButtonItem = (props) => {
  const { onClick, children } = props;
  return (
    <li className={styles.NavButtonItem}>
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </li>
  );
};

navButtonItem.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

navButtonItem.defaultProps = {
  onClick: () => {},
};

export default navButtonItem;
