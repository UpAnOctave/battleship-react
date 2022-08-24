import { useState } from 'react'
import { GAMEBOARD_SIZE } from '../constants/settings'
import { SHIPS } from '../constants/ships'
import { generateRandomLayout, ShipData } from '../lib/game'
import { Gameboard } from './Gameboard'

type Props = {
  ships: ShipData[]
  setShips: (ships: ShipData[]) => void
}

export const Battlefield = ({ ships, setShips }: Props) => {
  const [turn, setTurn] = useState<'player' | 'pc'>('player')
  const enemyShips = generateRandomLayout(SHIPS.length, GAMEBOARD_SIZE)
  const endTurn = () => {
    setTurn(turn === 'player' ? 'pc' : 'player')
  }

  return (
    <div className="flex justify-around">
      <Gameboard
        size={GAMEBOARD_SIZE}
        ships={ships}
        isBattleStarted={true}
        endTurn={endTurn}
      />
      <Gameboard
        size={GAMEBOARD_SIZE}
        ships={enemyShips}
        setShips={setShips}
        isBattleStarted={true}
        endTurn={endTurn}
        isActive={turn === 'player'}
      />
    </div>
  )
}
