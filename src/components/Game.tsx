import { GAMEBOARD_SIZE } from '../constants/settings'
import {
  BATTLESHIP,
  CARRIER,
  CRUISER,
  DESTROYER,
  SUBMARINE,
} from '../constants/ships'
import { Gameboard } from './Gameboard'
import { ShipsContainer } from './ShipsContainer'

export const Game = () => {
  return (
    <div className="flex justify-around">
      <ShipsContainer
        ships={[CARRIER, BATTLESHIP, CRUISER, SUBMARINE, DESTROYER]}
      />
      <Gameboard size={GAMEBOARD_SIZE} />
    </div>
  )
}
