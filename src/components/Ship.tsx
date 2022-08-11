import React, { useState } from 'react'

type Props = {
  id: number
  size: number
  orientation?: 'x' | 'y'
  onClick?: (id: number) => void
  isVisibilityForced?: boolean
}

export const Ship = ({
  id,
  size,
  orientation = 'y',
  onClick = () => null,
  isVisibilityForced = false,
}: Props) => {
  const [isVisible, setIsVisible] = useState(true)
  const body = Array.from(Array(size))
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer?.setData('id', `${id}`)
    event.dataTransfer?.setData('size', `${size}`)
    event.dataTransfer?.setData('orientation', orientation)
  }

  return (
    <div
      className={`flex gap-1 min-w-fit ${
        orientation === 'y' ? 'flex-col' : 'flex-row'
      } ${isVisibilityForced || isVisible ? '' : 'invisible'}`}
      draggable
      onDragStart={handleDragStart}
      onDrag={() => setIsVisible(false)}
      onClick={() => onClick(id)}
    >
      {body.map((item, index) => (
        <div key={index} className="h-12 w-12 bg-gray-500 z-10"></div>
      ))}
    </div>
  )
}
