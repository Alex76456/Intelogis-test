import { combineReducers } from "redux"

import ordersReducer from "./orders/reducer"
import deliveryPointsReducer from "./deliveryPoints/reducer"
import mapReducer from "./map/reducer"

// корневой редюсер
const rootReducer = combineReducers({
  orders: ordersReducer,
  deliveryPoints: deliveryPointsReducer,
  map: mapReducer,
})

export default rootReducer
