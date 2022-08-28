import { all, call, put, takeEvery } from "redux-saga/effects"

import { ICoord } from "../orders/types"

import { fetchDeliveryPointsFailure, fetchDeliveryPointsSuccess } from "./actions"
import { FETCH_DELIVERYPOINTS_REQUEST } from "./constants"

// мокк
const getDeliveryPoints = (): ICoord[] => [
  {
    _id: 1,
    Lat: 59.93559,
    Lng: 30.327249,
    Name: "Невский проспект",
  },
  {
    _id: 5,
    Lat: 59.972156,
    Lng: 30.258872,
    Name: "Крестовский остров",
  },

  {
    _id: 6,
    Lat: 59.866319,
    Lng: 30.321986,
    Name: "Парк победы",
  },

  {
    _id: 8,
    Lat: 59.952281,
    Lng: 30.285514,
    Name: "Стадион Петровский",
  },
  {
    _id: 7,
    Lat: 59.943553,
    Lng: 30.331705,
    Name: "Марсово поле",
  },
  {
    _id: 37,
    Lat: 59.937418,
    Lng: 30.302169,
    Name: "Медный всадник",
  },

  {
    _id: 10,
    Lat: 59.891385,
    Lng: 30.319398,
    Name: "Московские ворота",
  },
  {
    _id: 2,
    Lat: 59.940037,
    Lng: 30.32893,
    Name: "Спас на Крови",
  },
  {
    _id: 3,
    Lat: 59.94024,
    Lng: 30.337068,
    Name: "Михайловский замок",
  },
]

function* fetchDeliveryPointsSaga(): any {
  try {
    const response = yield call(getDeliveryPoints)
    yield put(
      fetchDeliveryPointsSuccess({
        deliveryPoints: response,
      }),
    )
  } catch (e: any) {
    // ловим ошибку
    yield put(
      fetchDeliveryPointsFailure({
        error: e.message,
      }),
    )
  }
}

function* deliveryPointsSaga() {
  yield all([takeEvery(FETCH_DELIVERYPOINTS_REQUEST, fetchDeliveryPointsSaga)])
}

export default deliveryPointsSaga
