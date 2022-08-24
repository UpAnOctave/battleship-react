import { useState } from 'react'
import { ShipData } from '../lib/game'
import { Battlefield } from './Battlefield'
import { ShipPlacementScreen } from './ShipPlacementScreen'

export const Game = () => {
  const [ships, setShips] = useState<ShipData[]>([])
  const [isGameStarted, setIsGameStarted] = useState(false)
  const handleDonePlacing = () => {
    setIsGameStarted(true)
  }

  return (
    <div>
      {isGameStarted ? (
        <Battlefield ships={ships} setShips={setShips} />
      ) : (
        <ShipPlacementScreen
          ships={ships}
          setShips={setShips}
          handleDonePlacing={handleDonePlacing}
        />
      )}
    </div>
  )
}
