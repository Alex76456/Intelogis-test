import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  SELECT_ORDER_QUERY,
  SELECT_ORDER_SUCCESS,
  EDIT_ORDER_COMMAND,
  EDIT_ORDER_SUCCESS,
  EDIT_POINT_COMMAND,
  EDIT_POINT_SUCCESS,
  EDIT_ORDERS_COMMAND,
  EDIT_ORDERS_SUCCESS,
} from "./constants"

import { OrdersActions, OrdersState } from "./types"

const initialState: OrdersState = {
  pendingOrders: false,
  orders: [],
  selectedOrder: null,
  editingOrder: null,
  editingPoint: null,
  error: null,
}

const ordersReducer = (state = initialState, action: OrdersActions) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        pending: true,
      }
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        pendingOrders: false,
        orders: action.payload.orders,
        selectedOrder: null,
        error: null,
      }
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        pendingOrders: false,
        orders: [],
        selectedOrder: null,
        error: action.payload.error,
      }
    case SELECT_ORDER_QUERY:
      return {
        ...state,
        pendingOrders: false,
        selectedOrder: action.payload.selectedOrder,
        error: null,
      }
    case SELECT_ORDER_SUCCESS:
      return {
        ...state,
        pendingOrders: false,
        error: null,
      }
    case EDIT_ORDER_COMMAND:
      return {
        ...state,
        pendingOrders: false,
        editingOrder: action.payload.editingOrder,
        error: null,
      }
    case EDIT_ORDER_SUCCESS:
      return {
        ...state,
        pendingOrders: false,
        error: null,
      }
    case EDIT_POINT_COMMAND:
      return {
        ...state,
        pendingOrders: false,
        editingPoint: action.payload.editingPoint,
        error: null,
      }
    case EDIT_POINT_SUCCESS:
      return {
        ...state,
        pendingOrders: false,
        error: null,
      }
    case EDIT_ORDERS_COMMAND:
      return {
        ...state,
        pendingOrders: false,
        orders: action.payload.editingOrders,
        error: null,
      }
    case EDIT_ORDERS_SUCCESS:
      return {
        ...state,
        pendingOrders: false,
        editingOrder: null,
        editingPoint: null,
        error: null,
      }
    default:
      return {
        ...state,
      }
  }
}

export default ordersReducer
