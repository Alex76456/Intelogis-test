import { FETCH_DELIVERYPOINTS_REQUEST, FETCH_DELIVERYPOINTS_FAILURE, FETCH_DELIVERYPOINTS_SUCCESS } from "./constants"

export const fetchDeliveryPointsOrder = () => ({
  type: FETCH_DELIVERYPOINTS_REQUEST,
})
export const fetchDeliveryPointsSuccess = (payload) => ({
  type: FETCH_DELIVERYPOINTS_SUCCESS,
  payload: payload,
})
export const fetchDeliveryPointsFailure = (payload) => ({
  type: FETCH_DELIVERYPOINTS_FAILURE,
  payload,
})
