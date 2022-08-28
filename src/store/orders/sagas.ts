import { all, call, put, takeLatest, takeEvery } from "redux-saga/effects"
import {
  editOrdersSuccess,
  editOrderSuccess,
  fetchOrdersFailure,
  fetchOrdersSuccess,
  selectOrderSuccess,
} from "./actions"
import { EDIT_ORDERS_COMMAND, EDIT_ORDER_COMMAND, FETCH_ORDERS_REQUEST, SELECT_ORDER_QUERY } from "./constants"

import { IOrder } from "./types"

// мокк
const getOrders = (): IOrder[] => {
  return [
    {
      _id: 1,
      name: "С Невского на Крестовский остров",
      points: [
        {
          _id: 1,
          fromCoords: {
            _id: 1,
            Lat: 59.93559,
            Lng: 30.327249,
            Name: "Невский проспект",
          },
          toCoords: {
            _id: 5,
            Lat: 59.972156,
            Lng: 30.258872,
            Name: "Крестовский остров",
          },
        },
      ],
    },
    {
      _id: 2,
      name: "От Парка Победы до стадиона Петровский",
      points: [
        {
          _id: 2,
          fromCoords: {
            _id: 6,
            Lat: 59.866319,
            Lng: 30.321986,
            Name: "Парк победы",
          },
          toCoords: {
            _id: 8,
            Lat: 59.952281,
            Lng: 30.285514,
            Name: "Стадион Петровский",
          },
        },
      ],
    },
    {
      _id: 3,
      name: "От Марсово поля до Медного всадника",
      points: [
        {
          _id: 3,
          fromCoords: {
            _id: 7,
            Lat: 59.943553,
            Lng: 30.331705,
            Name: "Марсово поле",
          },
          toCoords: {
            _id: 37,
            Lat: 59.937418,
            Lng: 30.302169,
            Name: "Медный всадник",
          },
        },
      ],
    },
  ]
}

function* fetchOrdersSaga(): any {
  try {
    const response = yield call(getOrders)
    yield put(
      fetchOrdersSuccess({
        orders: response,
      }),
    )
  } catch (e: any) {
    // ловим ошибку
    yield put(
      fetchOrdersFailure({
        error: e.message,
      }),
    )
  }
}

function* selectOrderSaga() {
  yield put(selectOrderSuccess())
}

function* editOrderSaga() {
  yield put(editOrderSuccess())
}

function* editOrdersSaga() {
  yield put(editOrdersSuccess())
}

function* ordersSaga() {
  yield all([takeLatest(FETCH_ORDERS_REQUEST, fetchOrdersSaga)])
  yield all([takeEvery(SELECT_ORDER_QUERY, selectOrderSaga)])
  yield all([takeEvery(EDIT_ORDER_COMMAND, editOrderSaga)])
  yield all([takeEvery(EDIT_ORDERS_COMMAND, editOrdersSaga)])
}

export default ordersSaga
