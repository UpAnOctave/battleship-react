import React from 'react'
import { getCellsOcuppiedByShip, ShipStatus } from '../lib/game'
import { Ship } from './Ship'

type Props = {
  x: number
  y: number
  ships: ShipStatus[]
  placeShip: (ship: ShipStatus) => void
  rotateShip: (id: number) => void
}

export const Cell = ({ x, y, ships, placeShip, rotateShip }: Props) => {
  const containsShip = ships.some((ship) =>
    getCellsOcuppiedByShip(ship).some((cell) => cell.x === x && cell.y === y)
  )
  const ship = ships.find((ship) => ship.x === x && ship.y === y)

  const dragOverHandler = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const dropHandler = (event: React.DragEvent) => {
    const id = Number(event.dataTransfer.getData('id'))
    const size = Number(event.dataTransfer.getData('size'))
    const orientation = event.dataTransfer.getData('orientation') as 'x' | 'y'
    placeShip({ id, x, y, size, orientation })
  }

  return (
    <div
      className={`h-12 w-12 text-center text-white relative ${
        containsShip ? 'bg-amber-300' : 'bg-black'
      }`}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      <p className="absolute top-0 w-full">{x}</p>
      <p className="absolute left-0 bottom-0">{y}</p>
      {ship ? (
        <Ship
          id={ship.id}
          size={ship.size}
          orientation={ship.orientation}
          onClick={rotateShip}
          isVisibilityForced={true}
        />
      ) : null}
    </div>
  )
}
