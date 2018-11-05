import React from "react";
import PropTypes from "prop-types";

import styles from "./sidebar-navigation.module.css";

import Logo from "./Logo";
import NavigationItems from "./NavigationItems";
import Backdrop from "../../ui/components/Backdrop";

const sideBarNavigation = (props) => {
  const { isAuthenticated, isDisplaySidebarNavigation, sidebarNavigationHideClickEvent } = props;
  let attachedClasses = [styles.Sidebar, styles.Close];
  if (props.isDisplaySidebarNavigation) {
    attachedClasses = [styles.Sidebar, styles.Open];
  }
  return (
    <>
      <Backdrop
        isDisplaySidebarNavigation={isDisplaySidebarNavigation}
        sidebarNavigationHideClickEvent={sidebarNavigationHideClickEvent}
      />
      <div className={attachedClasses.join(" ")}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav className={styles.Navigation}>
          <NavigationItems
            isAuthenticated={isAuthenticated}
            sidebarNavigationHideClickEvent={sidebarNavigationHideClickEvent}
          />
        </nav>
      </div>
    </>
  );
};

sideBarNavigation.propTypes = {
  sidebarNavigationHideClickEvent: PropTypes.func.isRequired,
  isDisplaySidebarNavigation: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default sideBarNavigation;
