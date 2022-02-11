import { expose } from "threads/worker"

const DIRECTIONS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
}

expose({
  validMove(gridDimensions, coordinates) {
    if (
      Array.isArray(coordinates) &&
      !coordinates.some(
        ([x, y]) =>
          x === -1 ||
          y === -1 ||
          x === gridDimensions[0] ||
          y === gridDimensions[1]
      ) // No coordinates outside the grid
    ) {
      const stringCoordinates = coordinates.map(
        (coordinate) => `${coordinate[0]},${coordinate[1]}`
      )
      if (new Set(stringCoordinates).size === stringCoordinates.length) {
        return true // No overlapping coordinates
      }
    }
    return false
  },
  generateRandomDirection() {
    return Object.values(DIRECTIONS)[Math.floor(Math.random() * 4)]
  },
  generateCoordinate(gridWidth, gridHeight) {
    const x = Math.floor(Math.random() * gridWidth)
    const y = Math.floor(Math.random() * gridHeight)
    return [
      x > 0 && x < gridWidth ? x : x > 0 ? x - 1 : x + 1, // Fit bounds
      y > 0 && y < gridHeight ? y : y > 0 ? y - 1 : y + 1, // Fit bounds
    ]
  },
  generateConnectedCoordinate([pastCoordinateX, pastCoordinateY]) {
    const shiftXYOrBoth = Math.random()
    let [shiftX, shiftY] = [0, 0]
    if (shiftXYOrBoth < 0.666) {
      // Shift at least X
      shiftX = Math.random() > 0.5 ? -1 : 1
    } else if (shiftXYOrBoth > 0.333) {
      // Shift at least Y
      shiftY = Math.random() > 0.5 ? -1 : 1
    }
    return [pastCoordinateX + shiftX, pastCoordinateY + shiftY]
  },
  generateRandomGridSize() {
    return [
      Math.round(Math.random() * 10) + 10,
      Math.round(Math.random() * 10) + 10,
    ]
  },
})
