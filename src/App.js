import './App.css'
import React, { useState, useEffect } from 'react'

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
  const [grid, setGrid] = useState()

  useEffect(() => {
    setGrid(randomGrid())
  }, [])
  return (
    <div className="App">
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {grid &&
          grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: grid[i][k] ? 'green' : '',
                  border: '1px solid black',
                }}
              />
            ))
          )}
      </div>
    </div>
  )
}

export default App
