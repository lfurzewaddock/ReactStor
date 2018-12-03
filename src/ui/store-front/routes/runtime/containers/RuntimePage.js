/* eslint-disable */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Loader from "../../../common/ui/components/Loader";
import NotFound from "../components/NotFound";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";

import * as actionsRoutes from "../../../modules/routes/actions/routes";

class RuntimePage extends Component {
  componentDidMount = () => {
    const { match, routesDataInit, routesDataApiCall } = this.props;
    const { runtime } = match.params;
    routesDataInit();
    routesDataApiCall(runtime);
  }

  render() {
    const { isPending, data } = this.props;

    if (Array.isArray(data) && data.length) {
      const { id, subject } = data[0];

      if (subject === "product") {
        return <ProductPage routeId={id} />
      }
      if (subject === "category") {
        return <CategoryPage routeId={id} />
      }
    } else {
      return isPending ? <Loader /> : <NotFound />
    }
  }
}

RuntimePage.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      runtime: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.object,
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      runtime: PropTypes.bool,
      subject: PropTypes.string,
      matter: PropTypes.object,
    }),
  ).isRequired,
  routesDataApiCall: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  data: state.routes.data,
  isPending: state.routes.isPending,
});

const mapDispatchToProps = dispatch => ({
  routesDataInit: () => dispatch(actionsRoutes.routesDataInit()),
  routesDataApiCall: (slug) => {
    dispatch(actionsRoutes.routesDataApiCall(slug));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RuntimePage));
