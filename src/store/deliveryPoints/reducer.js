import { FETCH_DELIVERYPOINTS_REQUEST, FETCH_DELIVERYPOINTS_SUCCESS, FETCH_DELIVERYPOINTS_FAILURE } from "./constants"

const initialState = {
  pendingDeliveryPoints: false,
  deliveryPoints: [],
  selectedDeliveryPoint: null,
  error: null,
}

const deliveryPointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DELIVERYPOINTS_REQUEST:
      return {
        ...state,
        pending: true,
      }
    case FETCH_DELIVERYPOINTS_SUCCESS:
      return {
        ...state,
        pending: false,
        deliveryPoints: action.payload.deliveryPoints,
        selecteddeliveryPoint: null,
        error: null,
      }
    case FETCH_DELIVERYPOINTS_FAILURE:
      return {
        ...state,
        pending: false,
        deliveryPoints: [],
        selecteddeliveryPoints: null,
        error: action.payload.error,
      }
    default:
      return {
        ...state,
      }
  }
}

export default deliveryPointsReducer