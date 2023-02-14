import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import useInterval from './useInterval'

const cols = 10
const rows = 10

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

const emptyGrid = () => {
  const grid = []
  for (let i = 0; i < rows; i++) {
    const row = []
    for (let j = 0; j < cols; j++) {
      row.push(0)
    }
    grid.push(row)
  }
  return grid
}

let count = 0
let cellCount = 0

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
  const [start, setStart] = useState(false)
  const startRef = useRef(start)
  startRef.current = start

  useEffect(() => {
    setGrid(randomGrid())
  }, [])

  function countLiveCells(grid) {
    let liveCellCount = 0
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === 1) {
          liveCellCount += 1
        }
      }
    }
    return liveCellCount
  }

  function runSimulation() {
    if (!startRef.current) {
      return
    }
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
      cellCount = countLiveCells(next)
      return next
    })
    count += 1
  }
  useInterval(() => {
    runSimulation(grid)
  }, 1000)

  return (
    <div className="App">
      <button
        onClick={() => {
          setStart(!start)
          if (!start) {
            startRef.current = true
          }
        }}
      >
        {start ? 'Stop' : 'Start'}
      </button>
      <button
        onClick={() => {
          setGrid(randomGrid)
          count = 0
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          setGrid(emptyGrid)
          count = 0
        }}
      >
        Clear
      </button>
      <p>Generation:{count}</p>
      <p>Alive Cells:{cellCount}</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 24px)`,
          width: 'fit-content',
          margin: '0 auto',
          backgroundColor: 'lightblue',
        }}
      >
        {grid &&
          grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: grid[i][k] ? 'blue' : '',
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
