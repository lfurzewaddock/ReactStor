import * as constants from "../constants";
import storeApi from "../../store-api";

export const categoryDataBegin = () => ({
  type: constants.CATEGORY_RETRIEVE_DATA_BEGIN,
});

export const categoryDataFailure = error => ({
  type: constants.CATEGORY_RETRIEVE_DATA_FAILURE,
  payload: error,
});

export const categoryDataSuccess = data => ({
  type: constants.CATEGORY_RETRIEVE_DATA_SUCCESS,
  payload: data,
});

export const categoryDataInit = () => dispatch => dispatch(categoryDataBegin());

export const categoryDataApiCall = id => (dispatch) => {
  const url = id ? `/api/v1/categories/${id}` : "/api/v1/categories";
  storeApi.get(url)
    .then((res) => {
      // console.log(JSON.stringify(res)); /* eslint-disable-line no-console */
      dispatch(categoryDataSuccess(res.data));
    }).catch((err) => {
      console.log(`${err.message} error`, err); /* eslint-disable-line no-console */
      dispatch(categoryDataFailure(err.message));
    });
};

export const categoryDataByRouteApiCall = id => dispatch => storeApi.get(`/api/v1/category-routes/${id}`)
  .then((res) => {
    // console.log(JSON.stringify(res)); /* eslint-disable-line no-console */
    dispatch(categoryDataSuccess(res.data));
  }).catch((err) => {
    console.log(`${err.message} error`, err); /* eslint-disable-line no-console */
    dispatch(categoryDataFailure(err.message));
  });
