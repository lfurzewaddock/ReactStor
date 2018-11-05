import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import styles from "./nav-link-item.module.css";

const navLinkItem = (props) => {
  const {
    link, exact, children, onClick,
  } = props;
  return (
    <li className={styles.NavLinkItem}>
      <NavLink
        to={link}
        exact={exact}
        activeClassName={styles.active}
        onClick={onClick}
      >
        {children}
      </NavLink>
    </li>
  );
};

navLinkItem.propTypes = {
  link: PropTypes.string,
  exact: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

navLinkItem.defaultProps = {
  link: "",
  exact: false,
  onClick: () => {},
};

export default navLinkItem;
