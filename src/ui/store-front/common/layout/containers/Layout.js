import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./layout.css";

class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
    <>
      <div>Toolbar, SideDrawer, Backdrop</div>
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
