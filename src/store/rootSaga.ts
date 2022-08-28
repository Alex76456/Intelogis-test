import { all, fork } from "redux-saga/effects"
import deliveryPointsSaga from "./deliveryPoints/sagas"
import ordersSaga from "./orders/sagas"
import mapSaga from "./map/sagas"

//корневая сага
export function* rootSaga(): any {
  yield all([fork(ordersSaga), fork(deliveryPointsSaga), fork(mapSaga)])
}
