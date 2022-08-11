import { ShipStatus } from '../lib/game'
import { Cell } from './Cell'

type Props = {
  y: number
  size: number
  ships: ShipStatus[]
  placeShip: (ship: ShipStatus) => void
  rotateShip: (id: number) => void
}

export const Row = ({ y, size, ships, placeShip, rotateShip }: Props) => {
  const row = Array.from(Array(size))

  return (
    <div className="flex justify-center gap-1 my-1">
      {row.map((item, index) => (
        <Cell
          key={index}
          x={index}
          y={y}
          ships={ships}
          placeShip={placeShip}
          rotateShip={rotateShip}
        />
      ))}
    </div>
  )
}
