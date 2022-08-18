import { Ship } from './Ship'

type Props = {
  ships: { id: number; size: number }[]
  handleDrop: (event: React.DragEvent) => void
}

export const ShipsContainer = ({ ships, handleDrop }: Props) => {
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  return (
    <div
      className="grid grid-cols-3 gap-4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {ships.map((ship) => (
        <Ship key={ship.id} id={ship.id} size={ship.size} />
      ))}
    </div>
  )
}
