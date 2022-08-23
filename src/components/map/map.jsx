import React, { useEffect } from "react"
import "./map.css"
import "leaflet/dist/leaflet.css"

import { useDispatch, useSelector } from "react-redux"
import { MapContainer, Marker, Popup, Polyline, TileLayer, useMap } from "react-leaflet"

import {
  getErrorSelector,
  getPendingMapSelector,
  getPointsCenterSelector,
  getPositionsSelector,
} from "../../store/map/selectors"
import { fetchPositionsOrder } from "../../store/map/actions"

import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from "leaflet"
import { LoadingOutlined } from "@ant-design/icons"
import { Result, Spin } from "antd"
import { getSelectedOrderSelector } from "../../store/orders/selectors"

export const Map = () => {
  const dispatch = useDispatch()
  const order = useSelector(getSelectedOrderSelector)
  const pendingMap = useSelector(getPendingMapSelector)
  const error = useSelector(getErrorSelector)
  const pointsCenter = useSelector(getPointsCenterSelector)
  const positions = useSelector(getPositionsSelector)

  const defaultZoom = 13
  const antIcon = <LoadingOutlined spin />

  const lineOptions = { color: "green" }

  const pointIcon = new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })

  // запрашиваем данные при изменении текущего заказа
  useEffect(() => {
    if (order !== null) {
      dispatch(fetchPositionsOrder())
    }
  }, [order, dispatch])

  const renderPositions = (index) => {
    if (positions.length < 1) {
      return null
    }
    return <Polyline pathOptions={lineOptions} positions={positions[index]} />
  }

  function FlyToCenterMarker() {
    const map = useMap()
    if (pointsCenter !== undefined) {
      map.flyTo(pointsCenter, map.getZoom())
    }

    setTimeout(() => map.invalidateSize(), 100)

    return null
  }

  return (
    <div className="map">
      {/* если ошибка */}
      {error ? (
        <Result status="warning" title="Ошибка" className="loadingError">
          <h2>{error}</h2>
        </Result>
      ) : null}

      {/* запрос в процессе */}
      {pendingMap ? (
        <div className="loadingSpin">
          <Spin indicator={antIcon} size="large" />
        </div>
      ) : null}

      <MapContainer center={pointsCenter} zoom={defaultZoom} scrollWheelZoom={false}>
        <div>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {order?.points.map((item, index) => {
            return (
              <div>
                <Marker position={[item.fromCoords.Lat, item.fromCoords.Lng]} icon={pointIcon}>
                  <Popup>{item.fromCoords.Name}</Popup>
                </Marker>

                <Marker position={[item.toCoords.Lat, item.toCoords.Lng]} icon={pointIcon}>
                  <Popup>{item.toCoords.Name}</Popup>
                </Marker>

                {renderPositions(index)}
              </div>
            )
          })}
        </div>

        {/* перебрасывает на центр карты */}
        <FlyToCenterMarker />
      </MapContainer>
    </div>
  )
}
