import { createSelector } from "reselect"

const getPendingOrders = (state) => state.orders.pendingOrders
const getOrders = (state) => state.orders.orders
const getSelectedOrder = (state) => state.orders.selectedOrder
const getEditingOrder = (state) => state.orders.editingOrder
const getEditingPoint = (state) => state.orders.editingPoint
const getError = (state) => state.orders.error

export const getOrdersSelector = createSelector(getOrders, (orders) => orders)
export const getSelectedOrderSelector = createSelector(getSelectedOrder, (order) => order)
export const getEditingOrderSelector = createSelector(getEditingOrder, (order) => order)
export const getEditingPointSelector = createSelector(getEditingPoint, (point) => point)
export const getPendingOrdersSelector = createSelector(getPendingOrders, (pending) => pending)
export const getErrorSelector = createSelector(getError, (error) => error)
