import React from "react";
import PropTypes from "prop-types";

import "hamburgers/_sass/hamburgers/hamburgers.scss";
import styles from "./sidebar-navigaton-toggle.module.css";

const sideBarNavigationToggle = (props) => {
  const { clickEvent, isDisplaySidebarNavigation } = props;
  let hamburgerButtonStyle = [styles.hamburger, "hamburger", "hamburger--elastic"];
  let hamburgerButtonIsAriaExpanded = "false";
  if (isDisplaySidebarNavigation) {
    hamburgerButtonStyle = hamburgerButtonStyle.concat([styles.isActive, "is-active"]);
    hamburgerButtonIsAriaExpanded = "true";
  }
  const hamburgerSpanInnerStyle = [styles.hamburgerInner, "hamburger-inner"];
  return (
    <div className={styles.SidebarNavigationToggle}>
      <button
        className={hamburgerButtonStyle.join(" ")}
        type="button"
        aria-label="Menu"
        aria-controls="navigation"
        aria-expanded={hamburgerButtonIsAriaExpanded}
        onClick={clickEvent}
      >
        <span className="hamburger-box">
          <span className={hamburgerSpanInnerStyle.join(" ")} />
        </span>
      </button>
    </div>
  );
};

sideBarNavigationToggle.propTypes = {
  clickEvent: PropTypes.func.isRequired,
  isDisplaySidebarNavigation: PropTypes.bool.isRequired,
};

export default sideBarNavigationToggle;
