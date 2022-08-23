import { createSelector } from "reselect"

const getPendingMap = (state) => state.map.pendingMap

const getPositions = (state) => state.map.positions

const getPointsCenter = (state) => state.map.pointsCenter
const getError = (state) => state.map.error

export const getPositionsSelector = createSelector(getPositions, (positions) => positions)
export const getPendingMapSelector = createSelector(getPendingMap, (pending) => pending)
export const getPointsCenterSelector = createSelector(getPointsCenter, (pointsCenter) => pointsCenter)
export const getErrorSelector = createSelector(getError, (error) => error)
