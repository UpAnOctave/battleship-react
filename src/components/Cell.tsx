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

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    const id = Number(event.dataTransfer.getData('id'))
    const size = Number(event.dataTransfer.getData('size'))
    const orientation = event.dataTransfer.getData('orientation') as 'x' | 'y'
    const offset = Number(event.dataTransfer.getData('offset'))
    if (orientation === 'x') {
      placeShip({ id, x: x - offset, y, size, orientation })
    } else {
      placeShip({ id, x, y: y - offset, size, orientation })
    }
  }

  return (
    <div
      className={`h-12 w-12 text-center text-white relative select-none ${
        containsShip ? 'bg-amber-300' : 'bg-black'
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {ship ? (
        <Ship
          id={ship.id}
          size={ship.size}
          orientation={ship.orientation}
          onClick={rotateShip}
        />
      ) : null}
    </div>
  )
}
