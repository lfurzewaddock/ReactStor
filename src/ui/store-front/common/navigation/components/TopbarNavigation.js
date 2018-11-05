import React from "react";
import PropTypes from "prop-types";

import styles from "./topbar-navigation.module.css";

import Logo from "./Logo";
import SidebarNavigationToggle from "./SidebarNavigationToggle";
import NavigationItems from "./NavigationItems";

const topbarNavigation = (props) => {
  const { sidebarNavigationToggleClickEvent, isDisplaySidebarNavigation, isAuthenticated } = props;
  // TODO: Testing - REMOVE
  console.log("TopbarNavigation: authenticated ", isAuthenticated); /* eslint-disable-line no-console */
  return (
    <header className={styles.TopbarNavigation}>
      <SidebarNavigationToggle
        clickEvent={sidebarNavigationToggleClickEvent}
        isDisplaySidebarNavigation={isDisplaySidebarNavigation}
      />
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={styles.Navigation}>
        <NavigationItems isAuthenticated={isAuthenticated} />
      </nav>
    </header>
  );
};

topbarNavigation.propTypes = {
  sidebarNavigationToggleClickEvent: PropTypes.func.isRequired,
  isDisplaySidebarNavigation: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default topbarNavigation;
