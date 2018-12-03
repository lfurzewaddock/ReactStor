import * as constants from "../constants";
import storeApi from "../../store-api";

export const productDataBegin = () => ({
  type: constants.PRODUCT_RETRIEVE_DATA_BEGIN,
});

export const productDataFailure = error => ({
  type: constants.PRODUCT_RETRIEVE_DATA_FAILURE,
  payload: error,
});

export const productDataSuccess = data => ({
  type: constants.PRODUCT_RETRIEVE_DATA_SUCCESS,
  payload: data,
});

export const productDataInit = () => dispatch => dispatch(productDataBegin());

export const productDataApiCall = id => dispatch => storeApi.get(`/api/v1/products/${id}`)
  .then((res) => {
    // console.log(JSON.stringify(res)); /* eslint-disable-line no-console */
    dispatch(productDataSuccess(res.data));
  }).catch((err) => {
    console.log(`${err.message} error`, err); /* eslint-disable-line no-console */
    dispatch(productDataFailure(err.message));
  });

export const productDataByRouteApiCall = id => dispatch => storeApi.get(`/api/v1/product-routes/${id}`)
  .then((res) => {
    // console.log(JSON.stringify(res)); /* eslint-disable-line no-console */
    dispatch(productDataSuccess(res.data));
  }).catch((err) => {
    console.log(`${err.message} error`, err); /* eslint-disable-line no-console */
    dispatch(productDataFailure(err.message));
  });
