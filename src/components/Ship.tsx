import React, { useState } from 'react'

type Props = {
  id: number
  size: number
  orientation?: 'x' | 'y'
  onClick?: (id: number) => void
}

export const Ship = ({
  id,
  size,
  orientation = 'y',
  onClick = () => null,
}: Props) => {
  const [isVisible, setIsVisible] = useState(true)
  const [dragOffset, setDragOffset] = useState(0)
  const body = Array.from(Array(size))
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer?.setData('id', `${id}`)
    event.dataTransfer?.setData('size', `${size}`)
    event.dataTransfer?.setData('orientation', orientation)
    event.dataTransfer?.setData('offset', `${dragOffset}`)
  }

  return (
    <div
      className={`flex gap-1 min-w-fit ${
        orientation === 'y' ? 'flex-col' : 'flex-row'
      } ${isVisible ? '' : 'invisible'}`}
      draggable
      onDragStart={handleDragStart}
      onDrag={() => setIsVisible(false)}
      onDragEnd={() => setIsVisible(true)}
      onClick={() => onClick(id)}
    >
      {body.map((item, index) => (
        <div
          key={index}
          className="h-12 w-12 bg-gray-500 z-10"
          onMouseDown={() => setDragOffset(index)}
        ></div>
      ))}
    </div>
  )
}
