/* eslint-disable */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actionsProducts from "../../../modules/products/actions/products";

class ProductPage extends Component {
  state = {  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { productDataApiCall } = this.props;
    productDataApiCall(id);
  }

  render() {
    const { history, location, currentPage } = this.props;
    const locationPathname = location && location.pathname ? location.pathname : '/';
    
    console.log("history", history)
    console.log("currentPage", currentPage)
    console.log("location", location)
    console.log("location.pathname", location.pathname)
    console.log("locationPathname", locationPathname)

    const { data } = this.props;
    const productData = data.map(product => <li key={product.id}>{product.name} code: {product.code}</li>);
    return (
      <ul>
        {productData}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  data: state.products.data,
});

const mapDispatchToProps = dispatch => ({
  productDataApiCall: (id) => {
    dispatch(actionsProducts.productDataApiCall(id));
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductPage));