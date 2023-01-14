import logo from './logo.svg'
import './App.css'

const cols = 30
const rows = 30

const randomGrid = () => {
  const grid = []
  for (let i = 0; i < rows; i++) {
    const row = []
    for (let j = 0; j < cols; j++) {
      row.push(Math.floor(Math.random() * 2))
    }
    grid.push(row)
  }
  return grid
}

console.log(randomGrid())

function App() {
  return <div className="App"></div>
}

export default App
