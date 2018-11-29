import * as constants from "../constants";
import storeApi from "../../store-api";

export const productData = () => ({
  type: constants.PRODUCT_DATA,
});

export const productDataError = error => ({
  type: constants.PRODUCT_DATA_ERROR,
  payload: error,
});

export const productDataSuccess = data => ({
  type: constants.PRODUCT_DATA_SUCCESS,
  payload: data,
});

export const productDataInit = () => dispatch => dispatch(productData());

export const productDataApiCall = id => dispatch => storeApi.get(`/api/v1/products/${id}`)
  .then((res) => {
    // console.log(JSON.stringify(res)); /* eslint-disable-line no-console */
    dispatch(productDataSuccess(res.data));
  }).catch((err) => {
    console.log(`${err.message} error`, err); /* eslint-disable-line no-console */
    dispatch(productDataError(err.message));
  });
