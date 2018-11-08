import React, { Component } from "react";
import PropTypes from "prop-types";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";

import TopbarNavigation from "../components/TopbarNavigation";
import SidebarNavigation from "../components/SidebarNavigation";

import * as actionsAuth from "../../../modules/users/actions/auth";

class PrimaryNavigation extends Component {
  componentDidMount() {
    this.checkAuthentication();
    // TODO: Testing - REMOVE
    const { authenticated } = this.props;
    console.log("PrimaryNavigation: componentDidMount() : authenticated", authenticated); /* eslint-disable-line no-console */
  }

  componentDidUpdate() {
    this.checkAuthentication();
    // TODO: Testing - REMOVE
    const { authenticated } = this.props;
    console.log("PrimaryNavigation: componentDidUpdate() : authenticated", authenticated); /* eslint-disable-line no-console */
  }

  checkAuthentication = () => {
    const { auth, isAuthApiCall } = this.props;
    isAuthApiCall(auth);
  }

  render() {
    const {
      authenticated,
      sidebarNavigationToggleClickEvent,
      sidebarNavigationHideClickEvent,
      isDisplaySidebarNavigation,
      location,
    } = this.props;
    // TODO: Testing - REMOVE
    console.log("PrimaryNavigation: authenticated ", authenticated); /* eslint-disable-line no-console */
    return (
      <>
        <TopbarNavigation
          isAuthenticated={authenticated}
          sidebarNavigationToggleClickEvent={sidebarNavigationToggleClickEvent}
          isDisplaySidebarNavigation={isDisplaySidebarNavigation}
          location={location}
        />
        <SidebarNavigation
          isAuthenticated={authenticated}
          isDisplaySidebarNavigation={isDisplaySidebarNavigation}
          sidebarNavigationHideClickEvent={sidebarNavigationHideClickEvent}
          location={location}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  isAuthApiCall: (auth) => {
    dispatch(actionsAuth.isAuthApiCall(auth));
  },
});

PrimaryNavigation.propTypes = {
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
  sidebarNavigationToggleClickEvent: PropTypes.func.isRequired,
  sidebarNavigationHideClickEvent: PropTypes.func.isRequired,
  isDisplaySidebarNavigation: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  isAuthApiCall: PropTypes.func.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
};

export default connect(
  mapStateToProps, mapDispatchToProps,
)(withAuth(PrimaryNavigation));
