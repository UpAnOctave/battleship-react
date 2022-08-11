import { Ship } from './Ship'

type Props = {
  ships: { id: number; size: number }[]
}

export const ShipsContainer = ({ ships }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {ships.map((ship) => (
        <Ship key={ship.id} id={ship.id} size={ship.size} />
      ))}
    </div>
  )
}
