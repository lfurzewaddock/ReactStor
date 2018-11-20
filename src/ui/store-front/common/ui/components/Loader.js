import React from "react";
import PropTypes from "prop-types";
import { CircleLoader } from "react-spinners";

import styles from "./loader.module.css";

const Loader = (props) => {
  const { isLoading } = props;
  return (
    <div className={styles.Loader}>
      <CircleLoader
        sizeUnit="px"
        size={150}
        color="#272d2d;"
        loading={isLoading}
      />
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
