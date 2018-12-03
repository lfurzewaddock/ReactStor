import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actionsProducts from "../../../modules/products/actions/products";

class ProductPage extends Component {
  componentDidMount() {
    const { routeId, productDataByRouteApiCall } = this.props;
    productDataByRouteApiCall(routeId);
  }

  render() {
    const { productsData } = this.props;
    const productData = productsData.map(product => (
      <li key={product.id}>
        {product.title}
        code:&nbsp;
        {product.code}
      </li>
    ));
    return (
      <ul>
        {productData}
      </ul>
    );
  }
}

ProductPage.propTypes = {
  routeId: PropTypes.number.isRequired,
  productsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      code: PropTypes.string,
    }),
  ).isRequired,
  productDataByRouteApiCall: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  productsData: state.products.data,
});

const mapDispatchToProps = dispatch => ({
  productDataByRouteApiCall: (id) => {
    dispatch(actionsProducts.productDataByRouteApiCall(id));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductPage));
