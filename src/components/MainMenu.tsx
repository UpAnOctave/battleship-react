import {
  GAME_TITLE,
  SINGLE_PLAYER_MODE,
  TWO_PLAYERS_MODE,
} from '../constants/strings'

type Props = {
  startSinglePlayer: () => void
}

export const MainMenu = ({ startSinglePlayer }: Props) => {
  return (
    <div className="flex flex-col gap-5 text-center">
      <p className="text-6xl font-bold">{GAME_TITLE}</p>
      <button className="text-3xl font-bold" onClick={startSinglePlayer}>
        {SINGLE_PLAYER_MODE}
      </button>
      <button className="text-3xl font-bold">{TWO_PLAYERS_MODE}</button>
    </div>
  )
}
