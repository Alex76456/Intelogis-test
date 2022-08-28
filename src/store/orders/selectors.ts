import { createSelector } from "reselect"

import { AppState } from "../rootReducer"

const getPendingOrders = (state: AppState) => state.orders.pendingOrders
const getOrders = (state: AppState) => state.orders.orders
const getSelectedOrder = (state: AppState) => state.orders.selectedOrder
const getEditingOrder = (state: AppState) => state.orders.editingOrder
const getEditingPoint = (state: AppState) => state.orders.editingPoint
const getError = (state: AppState) => state.orders.error

export const getOrdersSelector = createSelector(getOrders, (orders) => orders)
export const getSelectedOrderSelector = createSelector(getSelectedOrder, (order) => order)
export const getEditingOrderSelector = createSelector(getEditingOrder, (order) => order)
export const getEditingPointSelector = createSelector(getEditingPoint, (point) => point)
export const getPendingOrdersSelector = createSelector(getPendingOrders, (pending) => pending)
export const getErrorSelector = createSelector(getError, (error) => error)
