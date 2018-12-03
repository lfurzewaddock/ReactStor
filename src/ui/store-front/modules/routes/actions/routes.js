import * as constants from "../constants";
import storeApi from "../../store-api";

export const routesDataRetrieveBegin = () => ({
  type: constants.ROUTE_RETRIEVE_DATA_BEGIN,
});

export const routesDataRetrieveFailure = error => ({
  type: constants.ROUTE_RETRIEVE_DATA_FAILURE,
  payload: error,
});

export const routesDataRetrieveSuccess = data => ({
  type: constants.ROUTE_RETRIEVE_DATA_SUCCESS,
  payload: data,
});

export const routesDataInit = () => dispatch => dispatch(routesDataRetrieveBegin());

export const routesDataApiCall = slug => dispatch => storeApi.get(`/api/v1/routes/${slug}`)
  .then((res) => {
    // console.log(JSON.stringify(res)); /* eslint-disable-line no-console */
    dispatch(routesDataRetrieveSuccess(res.data));
  }).catch((err) => {
    console.log(`${err.message} error`, err); /* eslint-disable-line no-console */
    dispatch(routesDataRetrieveFailure(err.message));
  });
