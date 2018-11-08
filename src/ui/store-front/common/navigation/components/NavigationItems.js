import React from "react";
import PropTypes from "prop-types";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";

import styles from "./navigation-items.module.css";

import NavLinkItem from "./NavLinkItem";
import NavButtonItem from "./NavButtonItem";

import * as actionsLogin from "../../../modules/users/actions/login";

const navigationItems = (props) => {
  const {
    isAuthenticated, auth, sidebarNavigationHideClickEvent, logoutApiCall,
  } = props;
  // TODO: Testing - REMOVE
  console.log("navigationItems: isAuthenticated ", isAuthenticated); /* eslint-disable-line no-console */
  const authNav = isAuthenticated ? (
    <>
      <NavButtonItem onClick={() => {
        logoutApiCall(auth);
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  logoutApiCall: (auth) => {
    dispatch(actionsLogin.logoutApiCall(auth));
  },
});

navigationItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
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
  logoutApiCall: PropTypes.func.isRequired,
};

navigationItems.defaultProps = {
  sidebarNavigationHideClickEvent: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withAuth(navigationItems));
