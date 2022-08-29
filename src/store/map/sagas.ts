import { all, call, put, takeLatest, select } from "redux-saga/effects"
import { getEditingPointSelector, getSelectedOrderSelector } from "../orders/selectors"

import { fetchPositionsFailure, fetchPositionsSuccess } from "./actions"
import { FETCH_POSITIONS_REQUEST } from "./constants"

import { LatLngExpression } from "leaflet"

import { ICoord, IOrder, IPoint } from "../orders/types"

const getPositions = async (points: IPoint[]) => {
  const positions: LatLngExpression[][] = []
  const promises: Promise<any>[] = []
  points.forEach((item) => {
    promises.push(
      getPositionsByCoords(item.fromCoords, item.toCoords).then((result: any) => {
        if (result !== null && result !== undefined) {
          positions.push(result)
        }
      }),
    )
  })

  await Promise.all(promises)
  return positions
}

const getPositionsByCoords = async (coords1: ICoord, coords2: ICoord) => {
  return fetch(
    `https://open.mapquestapi.com/directions/v2/route?key=OGKs8XqfDZOzlWoOMXrlCJ4vk8298kVz&from=${coords1.Lat},${coords1.Lng}&to=${coords2.Lat},${coords2.Lng}`,
    {
      mode: "cors",
      method: "GET",
    },
  ).then((response) => {
    if (response.ok) {
      return response.json().then((result) => {
        const positions: LatLngExpression[][] = []
        if (result.info && result.info.statuscode !== 0) {
          return null
        }

        result.route.legs.forEach((leg: any) => {
          leg.maneuvers.forEach((maneuver: any) => {
            positions.push(maneuver.startPoint)
          })
        })
        return positions
      })
    }
  })
}

const getPointsCenter = (points: IPoint[]) => {
  if (points === null || points.length < 1) {
    return undefined
  }

  return {
    lat: points[0].fromCoords.Lat + (points[0].toCoords.Lat - points[0].fromCoords.Lat) / 2,
    lng: points[0].fromCoords.Lng + (points[0].toCoords.Lng - points[0].fromCoords.Lng) / 2,
  }
}

function* fetchPositionsSaga(): any {
  try {
    const order = yield select(getSelectedOrderSelector)

    if (order === null) {
      yield put(
        fetchPositionsFailure({
          error: "Ошибка",
        }),
      )
    }

    const newPoint: IPoint = yield select(getEditingPointSelector)

    const response = yield call(getPositions, newPoint ? [newPoint] : order.points)
    const pointsCenter = getPointsCenter(newPoint ? [newPoint] : order.points)

    if (response !== null && response.length > 0) {
      yield put(
        fetchPositionsSuccess({
          positions: response,
          pointsCenter: pointsCenter,
        }),
      )
    } else {
      yield put(
        fetchPositionsFailure({
          error: "Ошибка маршрута",
        }),
      )
    }
  } catch (e: any) {
    // ловим ошибку
    yield put(
      fetchPositionsFailure({
        error: e.message,
      }),
    )
  }
}

function* positionsSaga() {
  yield all([takeLatest(FETCH_POSITIONS_REQUEST, fetchPositionsSaga)])
}

export default positionsSaga
