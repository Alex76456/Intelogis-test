import { Resizable } from "re-resizable"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { getErrorSelector, getPendingOrdersSelector } from "./store/orders/selectors"

import { Map } from "./components/map/map"
import { Orders } from "./components/orders/orders"
import { fetchOrdersOrder } from "./store/orders/actions"

const App = () => {
  const dispatch = useDispatch()

  const pendingOrders = useSelector(getPendingOrdersSelector)
  const error = useSelector(getErrorSelector)

  const antIcon = <LoadingOutlined spin />

  useEffect(() => {
    dispatch(fetchOrdersOrder())
  }, [dispatch])

  if (error) {
    return <h1>{error}</h1>
  }

  if (pendingOrders) {
    return (
      <div>
        <Spin indicator={antIcon} size="large" />
      </div>
    )
  }

  return (
    <div className="orderPage">
      {/* Resizable позволяет изменять ширину Orders */}

      <Resizable
        grid={[1, 0]}
        minWidth={200}
        defaultSize={{
          width: 450,
        }}
      >
        <Orders />
      </Resizable>

      <Map />
    </div>
  )
}

export default App
