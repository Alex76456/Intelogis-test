import { createSelector } from "reselect"

const getPendingDeliveryPoints = (state) => state.deliveryPoints.pendingDeliveryPoints
const getDeliveryPoints = (state) => state.deliveryPoints.deliveryPoints
const getSelectedDeliveryPoint = (state) => state.deliveryPoints.selectedDeliveryPoint
const getError = (state) => state.deliveryPoints.error

export const getDeliveryPointsSelector = createSelector(getDeliveryPoints, (deliveryPoints) => deliveryPoints)
export const getSelectedDeliveryPointSelector = createSelector(
  getSelectedDeliveryPoint,
  (deliveryPoint) => deliveryPoint,
)
export const getPendingDeliveryPointsSelector = createSelector(getPendingDeliveryPoints, (pending) => pending)
export const getErrorSelector = createSelector(getError, (error) => error)
