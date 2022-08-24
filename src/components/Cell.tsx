import React, { useEffect, useState } from 'react'
import { getCellsOcuppiedByShip, ShipData } from '../lib/game'
import { Ship } from './Ship'

type Props = {
  x: number
  y: number
  ships: ShipData[]
  placeShip?: (ship: ShipData) => void
  rotateShip?: (id: number) => void
  attackShip?: (hit: boolean, id?: number) => void
  isActive?: boolean
}

type CellStatus = 'water' | 'ship' | 'hit' | 'miss'

export const Cell = ({
  x,
  y,
  ships,
  placeShip,
  rotateShip,
  attackShip,
  isActive = false,
}: Props) => {
  const [status, setStatus] = useState<CellStatus>(
    ships.some((ship) =>
      getCellsOcuppiedByShip(ship).some((cell) => cell.x === x && cell.y === y)
    )
      ? 'ship'
      : 'water'
  )
  const ship = ships.find((ship) => ship.x === x && ship.y === y)

  useEffect(() => {
    if (placeShip || rotateShip) {
      setStatus(
        ships.some((placedShip) =>
          getCellsOcuppiedByShip(placedShip).some(
            (cell) => cell.x === x && cell.y === y
          )
        )
          ? 'ship'
          : 'water'
      )
    }
  }, [ships, placeShip, rotateShip, x, y])

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    const id = Number(event.dataTransfer.getData('id'))
    const size = Number(event.dataTransfer.getData('size'))
    const orientation = event.dataTransfer.getData('orientation') as 'x' | 'y'
    const offset = Number(event.dataTransfer.getData('offset'))
    if (orientation === 'x' && placeShip) {
      placeShip({ id, x: x - offset, y, size, orientation })
    } else if (placeShip) {
      placeShip({ id, x, y: y - offset, size, orientation })
    }
  }

  const handleClick = () => {
    if (!attackShip || !isActive) {
      return
    }

    if (status === 'miss' || status === 'hit') {
      return
    }

    if (status === 'water') {
      setStatus('miss')
      attackShip(false)
    }

    if (status === 'ship') {
      const attackedShip = ships.find((ship) =>
        getCellsOcuppiedByShip(ship).some(
          (cell) => cell.x === x && cell.y === y
        )
      )
      setStatus('hit')
      attackShip(true, attackedShip?.id)
    }
  }

  return (
    <div
      className={`h-12 w-12 text-center text-white relative select-none ${
        status === 'ship'
          ? 'bg-amber-300'
          : status === 'hit'
          ? 'bg-red-600'
          : status === 'miss'
          ? 'bg-neutral-500'
          : 'bg-black'
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {ship && placeShip ? (
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
