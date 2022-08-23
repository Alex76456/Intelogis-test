import { FETCH_POSITIONS_REQUEST, FETCH_POSITIONS_FAILURE, FETCH_POSITIONS_SUCCESS } from "./constants"

export const fetchPositionsOrder = () => ({
  type: FETCH_POSITIONS_REQUEST,
})
export const fetchPositionsSuccess = (payload) => ({
  type: FETCH_POSITIONS_SUCCESS,
  payload,
})
export const fetchPositionsFailure = (payload) => ({
  type: FETCH_POSITIONS_FAILURE,
  payload,
})
