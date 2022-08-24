import { ShipData } from '../lib/game'
import { Cell } from './Cell'

type Props = {
  y: number
  size: number
  ships: ShipData[]
  placeShip?: (ship: ShipData) => void
  rotateShip?: (id: number) => void
  attackShip?: (hit: boolean, id?: number) => void
  isActive?: boolean
}

export const Row = ({
  y,
  size,
  ships,
  placeShip,
  rotateShip,
  attackShip,
  isActive = false,
}: Props) => {
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
          attackShip={attackShip}
          isActive={isActive}
        />
      ))}
    </div>
  )
}
