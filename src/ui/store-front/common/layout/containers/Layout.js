import React, { Component } from "react";
import PropTypes from "prop-types";

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
    const { children } = this.props;
    const { isDisplaySidebarNavigation } = this.state;
    return (
      <>
        <PrimaryNavigation
          isDisplaySidebarNavigation={isDisplaySidebarNavigation}
          sidebarNavigationToggleClickEvent={this.sidebarNavigationToggleHandler}
          sidebarNavigationHideClickEvent={this.sidebarNavigationHideHandler}
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
};

export default Layout;
