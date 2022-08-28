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

export interface ICoord {
  _id: number
  Lat: number
  Lng: number
  Name: string
}

export interface IPoint {
  _id: number
  fromCoords: ICoord
  toCoords: ICoord
}

export interface IOrder {
  _id: number
  name: string
  points: IPoint[]
}

export interface OrdersState {
  pendingOrders: boolean
  requests: IOrder[]
  selectedOrder: IOrder | null
  editingOrder: IOrder | null
  editingPoint: IPoint | null
  error: string | null
}

export interface FetchOrdersSuccessPayload {
  requests: IOrder[]
}

export interface FetchOrdersFailurePayload {
  error: string
}

export interface SelectOrderPayload {
  selectedOrder: IOrder
}

export interface FetchOrdersRequest {
  type: typeof FETCH_ORDERS_REQUEST
}

export type FetchOrdersSuccess = {
  type: typeof FETCH_ORDERS_SUCCESS
  payload: FetchOrdersSuccessPayload
}

export type FetchOrdersFailure = {
  type: typeof FETCH_ORDERS_FAILURE
  payload: FetchOrdersFailurePayload
}

export type SelectOrder = {
  type: typeof SELECT_ORDER_QUERY
  payload: SelectOrderPayload
}

export type SelectOrderSuccess = {
  type: typeof SELECT_ORDER_SUCCESS
}

export type EditOrder = {
  type: typeof EDIT_ORDER_COMMAND
  payload: EditOrderPayload
}

export type EditOrderSuccess = {
  type: typeof EDIT_ORDER_SUCCESS
}

export interface EditOrderPayload {
  editingOrder: IOrder | null
}

export type EditPoint = {
  type: typeof EDIT_POINT_COMMAND
  payload: EditPointPayload
}

export type EditPointSuccess = {
  type: typeof EDIT_POINT_SUCCESS
}

export interface EditPointPayload {
  editingPoint: IPoint | null
}

export type EditOrders = {
  type: typeof EDIT_ORDERS_COMMAND
  payload: EditOrdersPayload
}

export type EditOrdersSuccess = {
  type: typeof EDIT_ORDERS_SUCCESS
}

export interface EditOrdersPayload {
  editingOrders: IOrder[]
}

export type OrdersActions =
  | FetchOrdersRequest
  | FetchOrdersSuccess
  | FetchOrdersFailure
  | SelectOrder
  | SelectOrderSuccess
  | EditOrder
  | EditOrderSuccess
  | EditPoint
  | EditPointSuccess
  | EditOrders
  | EditOrdersSuccess
