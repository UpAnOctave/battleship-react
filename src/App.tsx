import { useState } from 'react'
import { Game } from './components/Game'
import { MainMenu } from './components/MainMenu'

function App() {
  const [isGameScreenOpen, setIsGameScreenOpen] = useState(false)
  const startSinglePlayer = () => {
    setIsGameScreenOpen(true)
  }

  return (
    <div className="bg-slate-200 h-screen w-screen overflow-auto">
      {isGameScreenOpen ? (
        <Game />
      ) : (
        <MainMenu startSinglePlayer={startSinglePlayer} />
      )}
    </div>
  )
}

export default App
