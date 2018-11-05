import React from "react";
import PropTypes from "prop-types";
import { withAuth } from "@okta/okta-react";

import styles from "./navigation-items.module.css";

import NavLinkItem from "./NavLinkItem";
import NavButtonItem from "./NavButtonItem";
// import Authentication from "../containers/Authentication";

const navigationItems = (props) => {
  const { isAuthenticated, auth, sidebarNavigationHideClickEvent } = props;
  // TODO: Testing - REMOVE
  console.log("navigationItems: isAuthenticated ", isAuthenticated); /* eslint-disable-line no-console */
  const authNav = isAuthenticated ? (
    <>
      <NavButtonItem onClick={() => {
        auth.logout();
        sidebarNavigationHideClickEvent();
      }}
      >
      Logout
      </NavButtonItem>
      <NavLinkItem link="/profile" onClick={() => sidebarNavigationHideClickEvent()}>Profile</NavLinkItem>
    </>
  ) : (
    <>
      <NavLinkItem link="/login" onClick={() => sidebarNavigationHideClickEvent()}>Login</NavLinkItem>
      <NavLinkItem link="/register" onClick={() => sidebarNavigationHideClickEvent()}>Register</NavLinkItem>
    </>
  );

  return (
    <ul className={styles.NavigationItems}>
      <NavLinkItem link="/" exact onClick={() => sidebarNavigationHideClickEvent()}>Home</NavLinkItem>
      { authNav }
    </ul>
  );
};

navigationItems.propTypes = {
  isAuthenticated: PropTypes.bool,
  sidebarNavigationHideClickEvent: PropTypes.func,
  auth: PropTypes.shape({
    getAccessToken: PropTypes.func,
    getIdToken: PropTypes.func,
    getUser: PropTypes.func,
    handleAuthentication: PropTypes.func,
    isAuthenticated: PropTypes.func,
    login: PropTypes.func,
    logout: PropTypes.func,
    redirect: PropTypes.func,
  }).isRequired,
};

navigationItems.defaultProps = {
  isAuthenticated: false,
  sidebarNavigationHideClickEvent: () => {},
};

export default withAuth(navigationItems);
