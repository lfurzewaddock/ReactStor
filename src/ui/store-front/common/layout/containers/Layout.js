import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import styles from "./layout.module.css";

import PrimaryNavigation from "../../navigation/containers/PrimaryNavigation";

class Layout extends Component {
  state = {
    isDisplaySidebarNavigation: false,
  }

  sidebarNavigationHideHandler = () => {
    this.setState({ isDisplaySidebarNavigation: false });
  }

  sidebarNavigationToggleHandler = () => {
    this.setState(prevState => ({
      isDisplaySidebarNavigation: !prevState.isDisplaySidebarNavigation,
    }));
  }

  render() {
    const { children, location } = this.props;
    const { isDisplaySidebarNavigation } = this.state;
    return (
      <>
        <PrimaryNavigation
          isDisplaySidebarNavigation={isDisplaySidebarNavigation}
          sidebarNavigationToggleClickEvent={this.sidebarNavigationToggleHandler}
          sidebarNavigationHideClickEvent={this.sidebarNavigationHideHandler}
          location={location}
        />
        <main className={styles.Content}>
          {children}
        </main>
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
};

export default withRouter(Layout);
