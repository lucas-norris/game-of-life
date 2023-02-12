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

const positions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]

console.log(randomGrid())

function App() {
  const [grid, setGrid] = useState()

  useEffect(() => {
    setGrid(randomGrid())
  }, [])

  function runSimulation() {
    setGrid((g) => {
      const next = g.map((row, i) => {
        return row.map((cell, j) => {
          let sum = 0
          positions.forEach((element) => {
            const x = i + element[0]
            const y = j + element[1]
            if (x >= 0 && x < rows && y >= 0 && y < cols) {
              sum += g[x][y]
            }
          })
          if (sum < 2 || sum > 3) {
            return 0
          }
          if (sum === 3) {
            return 1
          }
          return g[i][j]
        })
      })
      return next
    })
  }

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
