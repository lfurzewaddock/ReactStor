import React, { Component } from "react";
import PropTypes from "prop-types";
import { withAuth } from "@okta/okta-react";

import TopbarNavigation from "../components/TopbarNavigation";
import SidebarNavigation from "../components/SidebarNavigation";

class PrimaryNavigation extends Component {
  state = { authenticated: false };

  componentDidMount() {
    this.checkAuthentication();
    // TODO: Testing - REMOVE
    const { authenticated } = this.state;
    console.log("PrimaryNavigation: componentDidMount() : authenticated", authenticated); /* eslint-disable-line no-console */
  }

  componentDidUpdate() {
    // TODO: Testing - REMOVE
    const { authenticated } = this.state;
    console.log("PrimaryNavigation: componentDidUpdate() : authenticated", authenticated); /* eslint-disable-line no-console */
    this.checkAuthentication();
  }

  // TODO: DRY move to module
  checkAuthentication = async () => {
    const { auth } = this.props;
    const { authenticated } = this.state;
    const isAuthenticated = await auth.isAuthenticated();
    if (isAuthenticated !== authenticated) {
      this.setState({ authenticated: isAuthenticated });
    }
  }

  render() {
    const { authenticated } = this.state;
    const {
      sidebarNavigationToggleClickEvent,
      sidebarNavigationHideClickEvent,
      isDisplaySidebarNavigation,
    } = this.props;
    // TODO: Testing - REMOVE
    console.log("PrimaryNavigation: authenticated ", authenticated); /* eslint-disable-line no-console */
    return (
      <>
        <TopbarNavigation
          isAuthenticated={authenticated}
          sidebarNavigationToggleClickEvent={sidebarNavigationToggleClickEvent}
          isDisplaySidebarNavigation={isDisplaySidebarNavigation}
        />
        <SidebarNavigation
          isAuthenticated={authenticated}
          isDisplaySidebarNavigation={isDisplaySidebarNavigation}
          sidebarNavigationHideClickEvent={sidebarNavigationHideClickEvent}
        />
      </>
    );
  }
}

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
};

export default withAuth(PrimaryNavigation);
