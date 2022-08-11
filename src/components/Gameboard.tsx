import { useState } from 'react'
import { isValidPlaceForShip, ShipStatus } from '../lib/game'
import { Row } from './Row'

type Props = {
  size: number
}

export const Gameboard = ({ size }: Props) => {
  const [ships, setShips] = useState<ShipStatus[]>([])

  const placeShip = (ship: ShipStatus) => {
    if (
      !ships.some((placedShip) => placedShip.id === ship.id) &&
      isValidPlaceForShip(ship, ships)
    ) {
      setShips([...ships, ship])
    }

    const restOfShips = ships.filter((placedShip) => placedShip.id !== ship.id)
    if (
      ships.some((placedShip) => placedShip.id === ship.id) &&
      isValidPlaceForShip(ship, restOfShips)
    ) {
      setShips([...restOfShips, ship])
    }
  }

  const rotateShip = (id: number) => {
    const ship = ships.find((placedShip) => placedShip.id === id)
    if (ship) {
      const restOfShips = ships.filter(
        (placedShip) => placedShip.id !== ship.id
      )

      const rotatedShip = {
        id: ship.id,
        x: ship.x,
        y: ship.y,
        size: ship.size,
        orientation: ship.orientation === 'x' ? 'y' : 'x',
      } as ShipStatus

      if (isValidPlaceForShip(rotatedShip, restOfShips)) {
        setShips([...restOfShips, rotatedShip])
      }
    }
  }

  const grid = Array.from(Array(size))

  return (
    <div>
      <div>
        {grid.map((item, index) => (
          <Row
            key={index}
            y={index}
            size={size}
            ships={ships}
            placeShip={placeShip}
            rotateShip={rotateShip}
          />
        ))}
      </div>
    </div>
  )
}
