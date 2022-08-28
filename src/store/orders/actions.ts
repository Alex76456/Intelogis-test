import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_SUCCESS,
  SELECT_ORDER_QUERY,
  SELECT_ORDER_SUCCESS,
  EDIT_ORDER_COMMAND,
  EDIT_ORDER_SUCCESS,
  EDIT_POINT_COMMAND,
  EDIT_POINT_SUCCESS,
  EDIT_ORDERS_COMMAND,
  EDIT_ORDERS_SUCCESS,
} from "./constants"

import {
  FetchOrdersRequest,
  FetchOrdersSuccess,
  FetchOrdersSuccessPayload,
  FetchOrdersFailure,
  FetchOrdersFailurePayload,
  SelectOrderPayload,
  SelectOrder,
  SelectOrderSuccess,
  EditOrder,
  EditOrderSuccess,
  EditOrderPayload,
  EditPoint,
  EditPointPayload,
  EditPointSuccess,
  EditOrdersPayload,
  EditOrders,
  EditOrdersSuccess,
} from "./types"

export const fetchOrdersRequest = (): FetchOrdersRequest => ({
  type: FETCH_ORDERS_REQUEST,
})

export const fetchOrdersSuccess = (payload: FetchOrdersSuccessPayload): FetchOrdersSuccess => ({
  type: FETCH_ORDERS_SUCCESS,
  payload,
})

export const fetchOrdersFailure = (payload: FetchOrdersFailurePayload): FetchOrdersFailure => ({
  type: FETCH_ORDERS_FAILURE,
  payload,
})

export const selectOrder = (payload: SelectOrderPayload): SelectOrder => ({
  type: SELECT_ORDER_QUERY,
  payload,
})

export const selectOrderSuccess = (): SelectOrderSuccess => ({
  type: SELECT_ORDER_SUCCESS,
})

export const editOrder = (payload: EditOrderPayload): EditOrder => ({
  type: EDIT_ORDER_COMMAND,
  payload,
})

export const editOrderSuccess = (): EditOrderSuccess => ({
  type: EDIT_ORDER_SUCCESS,
})

export const editPoint = (payload: EditPointPayload): EditPoint => ({
  type: EDIT_POINT_COMMAND,
  payload,
})

export const editPointSuccess = (): EditPointSuccess => ({
  type: EDIT_POINT_SUCCESS,
})

export const editOrders = (payload: EditOrdersPayload): EditOrders => ({
  type: EDIT_ORDERS_COMMAND,
  payload,
})

export const editOrdersSuccess = (): EditOrdersSuccess => ({
  type: EDIT_ORDERS_SUCCESS,
})

// export const fetchOrdersOrder = () => ({
//   type: FETCH_ORDERS_REQUEST,
// })
// export const fetchOrdersSuccess = (payload) => ({
//   type: FETCH_ORDERS_SUCCESS,
//   payload,
// })
// export const fetchOrdersFailure = (payload) => ({
//   type: FETCH_ORDERS_FAILURE,
//   payload,
// })
// export const selectOrder = (payload) => ({
//   type: SELECT_ORDER_QUERY,
//   payload,
// })
// export const selectOrderSuccess = () => ({
//   type: SELECT_ORDER_SUCCESS,
// })
// export const editOrder = (payload) => ({
//   type: EDIT_ORDER_COMMAND,
//   payload,
// })
// export const editOrderSuccess = () => ({
//   type: EDIT_ORDER_SUCCESS,
// })
// export const editPoint = (payload) => ({
//   type: EDIT_POINT_COMMAND,
//   payload,
// })
// export const editPointSuccess = () => ({
//   type: EDIT_POINT_SUCCESS,
// })
// export const editOrders = (payload) => ({
//   type: EDIT_ORDERS_COMMAND,
//   payload,
// })
// export const editOrdersSuccess = () => ({
//   type: EDIT_ORDERS_SUCCESS,
// })
