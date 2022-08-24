import { isValidPlaceForShip, ShipData } from '../lib/game'
import { Row } from './Row'

type Props = {
  size: number
  ships: ShipData[]
  setShips?: (ships: ShipData[]) => void
  isBattleStarted?: boolean
  endTurn?: () => void
  isActive?: boolean
}

export const Gameboard = ({
  size,
  ships,
  setShips,
  isBattleStarted = false,
  endTurn,
  isActive = false,
}: Props) => {
  const placeShip = (ship: ShipData) => {
    if (!setShips) {
      return
    }

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
    if (!setShips) {
      return
    }

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
      } as ShipData

      if (isValidPlaceForShip(rotatedShip, restOfShips)) {
        setShips([...restOfShips, rotatedShip])
      }
    }
  }

  const attackShip = (hit: boolean, id?: number) => {
    if (!setShips) {
      return
    }

    if (hit) {
      const previousHits = ships.find((ship) => ship.id === id)?.hits || 0
      setShips(
        ships.map((ship) =>
          ship.id === id ? { ...ship, hits: previousHits + 1 } : ship
        )
      )
    }

    if (endTurn) {
      endTurn()
    }
  }

  const rows = Array.from(Array(size))

  return (
    <div>
      <div>
        {rows.map((item, index) =>
          isBattleStarted ? (
            <Row
              key={index}
              y={index}
              size={size}
              ships={ships}
              attackShip={attackShip}
              isActive={isActive}
            />
          ) : (
            <Row
              key={index}
              y={index}
              size={size}
              ships={ships}
              placeShip={placeShip}
              rotateShip={rotateShip}
            />
          )
        )}
      </div>
    </div>
  )
}
