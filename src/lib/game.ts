import { GAMEBOARD_SIZE } from '../constants/settings'

export type ShipStatus = {
  id: number
  x: number
  y: number
  size: number
  orientation: 'x' | 'y'
}

export const getCellsOcuppiedByShip = (ship: ShipStatus) => {
  const cells = Array.from(Array(ship.size))
  return cells.map((cell, index) => {
    if (ship.orientation === 'x') {
      return { x: ship.x + index, y: ship.y }
    }
    return { x: ship.x, y: ship.y + index }
  })
}

export const isValidPlaceForShip = (ship: ShipStatus, ships: ShipStatus[]) => {
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
