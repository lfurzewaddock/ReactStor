/* eslint-disable */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";

import * as actionsCategories from "../../../modules/categories/actions/categories";

class CategoryPage extends Component {
  componentDidMount() {
    const { routeId, categoryDataByRouteApiCall } = this.props;
    categoryDataByRouteApiCall(routeId);
  }

  render() {
    const { data } = this.props;
    const categoryData = data.map(category => <li key={category.id}>{category.heading} <div dangerouslySetInnerHTML={{__html: category.body}} /></li>);
    return (
      <ul>
        {categoryData}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  data: state.categories.data,
});

const mapDispatchToProps = dispatch => ({
  categoryDataByRouteApiCall: (id) => {
    dispatch(actionsCategories.categoryDataByRouteApiCall(id));
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPage));