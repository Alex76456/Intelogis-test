import React, { useEffect } from "react"
import "./orders.css"
import "antd/dist/antd.min.css"
import { useDispatch, useSelector } from "react-redux"
import { Table, Dropdown, Menu, Result } from "antd"

import { EditOutlined, CheckOutlined, StopOutlined } from "@ant-design/icons"
import { editPoint, editOrder, editOrders, selectOrder } from "../../store/orders/actions"

import { getDeliveryPointsSelector } from "../../store/deliveryPoints/selectors"
import { fetchDeliveryPointsOrder } from "../../store/deliveryPoints/actions"

import { ICoord, IPoint, IOrder } from "../../store/orders/types"

import {
  getEditingPointSelector,
  getEditingOrderSelector,
  getErrorSelector,
  getOrdersSelector,
  getSelectedOrderSelector,
} from "../../store/orders/selectors"

// константа fromOreToSettings чтобы не использовать "магических" значений
import { fromOreToSettings } from "../../constants/points-settings"

const Orders = () => {
  const dispatch = useDispatch()
  const orders = useSelector(getOrdersSelector)
  const coords = useSelector(getDeliveryPointsSelector)
  const editingOrder = useSelector(getEditingOrderSelector)
  const editingPoint = useSelector(getEditingPointSelector)
  const error = useSelector(getErrorSelector)
  const selectedOrder = useSelector(getSelectedOrderSelector)

  // конвертируем данные под таблицу
  const converterData = (item: IOrder) => ({
    _id: item._id,
    key: item.name,
    name: item.name,
    points: item.points,
  })

  // запрашиваем данные при монтировании компонента
  useEffect(() => {
    dispatch(fetchDeliveryPointsOrder())
  }, [dispatch])

  // handleOnSelectItem и handleOnRow  выбираем заявку
  const handleOnSelectItem = (item: IOrder) => {
    if (item._id !== selectedOrder?._id) {
      dispatch(selectOrder({ selectedOrder: item }))
    }
  }

  const handleOnRow = (record: any) => {
    return {
      onClick: () => {
        handleOnSelectItem(record)
      },
    }
  }

  // начинаем редактирование
  const handleOnEditPoint = (order: IOrder) => {
    dispatch(editOrder({ editingOrder: order }))
  }

  // useEffect чтобы при клике на другую строку прекратить редактирование, если оно производилось
  useEffect(() => {
    dispatch(editOrder({ editingOrder: null }))
  }, [selectedOrder, dispatch])

  // сохранение
  const handleOnSavePoint = () => {
    if (!editingOrder || !editingPoint) {
      handleOnCancelPoint()
      return
    }

    const pointIndex = editingOrder.points.findIndex((p: IPoint) => p._id === editingPoint._id)
    editingOrder.points.splice(pointIndex, 1, editingPoint)
    const orderIndex = orders.findIndex((r: IOrder) => r._id === editingOrder._id)
    const editedOrders = [...orders]
    editedOrders.splice(orderIndex, 1, editingOrder)

    dispatch(editOrders({ editingOrders: editedOrders }))
  }

  const handleOnCancelPoint = () => {
    dispatch(editOrder({ editingOrder: null }))
    dispatch(editPoint({ editingPoint: null }))
  }

  // клик на выбранную точку для редактировния
  const handleOnMenuItemClick = (item: any, point: IPoint, directionCode: string) => {
    if (!editingOrder) {
      return
    }

    const orderIndex = orders.findIndex((order: IOrder) => order._id === editingOrder._id)
    if (orderIndex > -1) {
      const newCoord = coords.find((coord: ICoord) => coord._id === Number.parseInt(item.key))

      if (!newCoord) {
        return
      }

      const newPoint = {
        _id: editingPoint?._id || point._id,
        fromCoords: directionCode === fromOreToSettings.FROM ? newCoord : point.fromCoords,
        toCoords: directionCode === fromOreToSettings.TO ? newCoord : point.toCoords,
      }

      dispatch(editPoint({ editingPoint: newPoint }))
    }
  }

  // выбор точек
  const getMenu = (point: IPoint, directionCode: string) => {
    return (
      <Menu
        items={coords
          .filter(
            (coords: ICoord) =>
              (directionCode === fromOreToSettings.FROM && coords._id !== point.toCoords._id) ||
              (directionCode === fromOreToSettings.TO && coords._id !== point.fromCoords._id),
          )
          .map((item: ICoord) => {
            return {
              key: item._id,
              label: <div>{`${item.Name} (${item.Lat}, ${item.Lng})`}</div>,
            }
          })}
        onClick={(item) => {
          handleOnMenuItemClick(item, point, directionCode)
        }}
      />
    )
  }

  // точки с дропдауном для выбора новых точек
  const renderEditPoint = (point: IPoint) => {
    const isEdit = true

    return (
      <>
        <Dropdown
          overlay={getMenu(point, fromOreToSettings.FROM)}
          trigger={["click"]}
          overlayClassName="deliveryPoints"
        >
          <div className="dropdownList">
            <p>От:</p>
            {renderPointCoords(point.fromCoords, isEdit)}
          </div>
        </Dropdown>
        <Dropdown overlay={getMenu(point, fromOreToSettings.TO)} trigger={["click"]} overlayClassName="deliveryPoints">
          <div className="dropdownList">
            <p>До:</p>
            {renderPointCoords(point.toCoords, isEdit)}
          </div>
        </Dropdown>
      </>
    )
  }

  const renderPointCoords = (pointCoord: ICoord, isEdit?: boolean) => {
    return (
      <p key={`point_${pointCoord.Lat}_${pointCoord.Lng}`} className={isEdit ? "isEdit" : undefined}>
        <span className="spanText">{pointCoord.Name}</span> ({pointCoord.Lat}, {pointCoord.Lng})
      </p>
    )
  }

  const renderPointsRow = (point: IPoint) => {
    return (
      <>
        <div className="pointWrapper">
          <p>От: </p>
          {renderPointCoords(point.fromCoords)}
        </div>
        <div className="pointWrapper">
          <p>До: </p>
          {renderPointCoords(point.toCoords)}
        </div>
      </>
    )
  }

  // рендер кнопок действий
  const renderPointOperations = (order: IOrder) => {
    if (editingOrder?._id === order._id) {
      return (
        <div className="saveIcons">
          <CheckOutlined className="editIcon" onClick={handleOnSavePoint} />
          <StopOutlined className="editIcon" onClick={handleOnCancelPoint} />
        </div>
      )
    } else {
      return <EditOutlined className="editIcon" onClick={() => handleOnEditPoint(order)} />
    }
  }

  const renderPoint = (order: IOrder, point: IPoint) => {
    return (
      <div key={`${order._id}_${point._id}`} className="points">
        <div>{order._id === editingOrder?._id ? renderEditPoint(editingPoint || point) : renderPointsRow(point)}</div>

        {renderPointOperations(order)}
      </div>
    )
  }

  const renderPoints = (record: any) => <>{record.points.map((point: IPoint) => renderPoint(record, point))}</>

  const columns = [
    {
      title: "Заявка",
      dataIndex: "name",
      key: "name",
      render: (item: any, record: any) => <>{item}</>,
      width: 200,
    },

    {
      title: "Точки",
      dataIndex: "points",
      key: "points",
      width: 400,
      render: (item: any, record: any) => <>{renderPoints(record)}</>,
    },
  ]

  return (
    <div className="ordersBody">
      {/* если ошибка */}
      {error ? (
        <Result status="warning" title="Ошибка" className="loadingError">
          <h2>{error}</h2>
        </Result>
      ) : null}

      <h1 className="title">Список заказов</h1>

      <Table
        bordered
        rowClassName={(record, index) => (record._id === selectedOrder?._id ? "row activeRow" : "row")}
        dataSource={orders.map(converterData)}
        columns={columns}
        // pagination={{ position: ["topRight "] }}
        onRow={(record) => handleOnRow(record)}
      />
    </div>
  )
}
export { Orders }
