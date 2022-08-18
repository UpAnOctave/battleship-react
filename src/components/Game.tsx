import { useState } from 'react'
import { Battlefield } from './Battlefield'
import { ShipPlacementScreen } from './ShipPlacementScreen'

export const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const handleDonePlacing = () => {
    setIsGameStarted(true)
  }

  return (
    <div>
      {isGameStarted ? (
        <Battlefield />
      ) : (
        <ShipPlacementScreen handleDonePlacing={handleDonePlacing} />
      )}
    </div>
  )
}
