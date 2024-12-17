import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <><div className="container container-md mx-auto">
      <h1 className="text-5xl text-center font-bold my-20">Check List</h1>
    </div><button>Check All</button>
    <ul className="container container-sm">Loading...</ul></>
  )
    
}

export default App
