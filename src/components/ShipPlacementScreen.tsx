import { useEffect, useState } from 'react'
import { GAMEBOARD_SIZE } from '../constants/settings'
import { SHIPS } from '../constants/ships'
import { ShipStatus } from '../lib/game'
import { Gameboard } from './Gameboard'
import { ShipsContainer } from './ShipsContainer'

type Props = {
  handleDonePlacing: () => void
}

export const ShipPlacementScreen = ({ handleDonePlacing }: Props) => {
  const [ships, setShips] = useState<ShipStatus[]>([])
  const [availableShips, setAvailableShips] = useState(SHIPS)

  useEffect(() => {
    const notPlacedShips = []
    for (let index = 0; index < SHIPS.length; index++) {
      if (!ships.some((ship) => ship.id === index)) {
        notPlacedShips.push(SHIPS[index])
      }
    }

    setAvailableShips(notPlacedShips)
  }, [ships])

  const removeShipFromGameboard = (event: React.DragEvent) => {
    const id = Number(event.dataTransfer.getData('id'))
    setShips(ships.filter((placedShip) => placedShip.id !== id))
    setAvailableShips([...availableShips, SHIPS[id]])
  }

  const finishPlacing = () => {
    if (availableShips.length === 0) {
      handleDonePlacing()
    }
  }

  return (
    <div className="flex justify-around">
      <ShipsContainer
        ships={availableShips}
        handleDrop={removeShipFromGameboard}
      />
      <Gameboard size={GAMEBOARD_SIZE} ships={ships} setShips={setShips} />
      <button
        onClick={() => {
          setShips([])
          setAvailableShips(SHIPS)
        }}
      >
        RESET
      </button>
      <button onClick={finishPlacing}>DONE</button>
    </div>
  )
}
