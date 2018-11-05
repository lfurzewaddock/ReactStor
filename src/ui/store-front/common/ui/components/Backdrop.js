import React from "react";
import PropTypes from "prop-types";

import styles from "./backdrop.module.css";

const backdrop = (props) => {
  const { isDisplaySidebarNavigation, sidebarNavigationHideClickEvent } = props;
  return (
    isDisplaySidebarNavigation
      ? <button type="button" className={styles.Backdrop} onClick={sidebarNavigationHideClickEvent}>close sidebar</button>
      : null
  );
};

backdrop.propTypes = {
  sidebarNavigationHideClickEvent: PropTypes.func.isRequired,
  isDisplaySidebarNavigation: PropTypes.bool.isRequired,
};

export default backdrop;
