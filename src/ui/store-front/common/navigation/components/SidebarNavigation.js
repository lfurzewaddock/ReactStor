import React from "react";
import PropTypes from "prop-types";

import styles from "./sidebar-navigation.module.css";

import Logo from "./Logo";
import NavigationItems from "./NavigationItems";
import Backdrop from "../../ui/components/Backdrop";

const sideBarNavigation = (props) => {
  const {
    isAuthenticated, isDisplaySidebarNavigation, sidebarNavigationHideClickEvent, location,
  } = props;
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
            location={location}
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
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
};

export default sideBarNavigation;
