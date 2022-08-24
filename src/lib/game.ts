import { GAMEBOARD_SIZE } from '../constants/settings'
import { SHIPS } from '../constants/ships'

export type ShipData = {
  id: number
  x: number
  y: number
  size: number
  orientation: 'x' | 'y'
  hits?: number
}

export const getCellsOcuppiedByShip = (ship: ShipData) => {
  const cells = Array.from(Array(ship.size))
  return cells.map((cell, index) => {
    if (ship.orientation === 'x') {
      return { x: ship.x + index, y: ship.y }
    }

    return { x: ship.x, y: ship.y + index }
  })
}

export const isValidPlaceForShip = (ship: ShipData, ships: ShipData[]) => {
  const shipCells = getCellsOcuppiedByShip(ship)
  if (
    shipCells.some(
      (cell) =>
        cell.x >= GAMEBOARD_SIZE ||
        cell.x < 0 ||
        cell.y >= GAMEBOARD_SIZE ||
        cell.y < 0
    )
  ) {
    return false
  }

  if (
    ships.some((otherShip) =>
      getCellsOcuppiedByShip(otherShip).some((otherShipsCell) =>
        shipCells.some(
          (cell) =>
            cell.x >= otherShipsCell.x - 1 &&
            cell.x <= otherShipsCell.x + 1 &&
            cell.y >= otherShipsCell.y - 1 &&
            cell.y <= otherShipsCell.y + 1
        )
      )
    )
  ) {
    return false
  }

  return true
}

export const getRandomCell = (gameboardSize: number) => {
  const x = Math.floor(Math.random() * gameboardSize)
  const y = Math.floor(Math.random() * gameboardSize)
  return { x, y }
}

export const generateRandomLayout = (
  numberOfShips: number,
  gameboardSize: number
) => {
  const ships = [] as ShipData[]
  let ship: ShipData
  do {
    const index = ships.length
    do {
      const { x, y } = getRandomCell(gameboardSize)
      ship = {
        id: SHIPS[index].id,
        x,
        y,
        size: SHIPS[index].size,
        orientation: Math.round(Math.random()) === 0 ? 'x' : 'y',
      }
    } while (!isValidPlaceForShip(ship, ships))

    ships.push(ship)
  } while (ships.length < numberOfShips)

  return ships
}
