import { Resizable } from "re-resizable"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { getErrorSelector, getPendingOrdersSelector } from "./store/orders/selectors"

import { Map } from "./components/map/map"
import { Orders } from "./components/orders/orders"
import { fetchOrdersRequest } from "./store/orders/actions"

const App = () => {
  const dispatch = useDispatch()

  const pendingOrders = useSelector(getPendingOrdersSelector)
  const error = useSelector(getErrorSelector)

  const antIcon = <LoadingOutlined spin />

  useEffect(() => {
    dispatch(fetchOrdersRequest())
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
        style={{ borderRight: "10px solid #007bff" }}
        grid={[1, 0]}
        minWidth={250}
        maxWidth={"80vw"}
        defaultSize={{
          width: "100vh",
          height: "auto",
        }}
        enable={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <Resizable
          grid={[0, 1]}
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          <Orders />
        </Resizable>
      </Resizable>

      <Map />
    </div>
  )
}

export default App
