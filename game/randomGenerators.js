import { DIRECTIONS } from "./gameMechanics.js"

export const validMove = async (gridDimensions, coordinates) => {
  // TODO: Check if a move is valid!
  return true
}

export const getRandomDirection = async () => {
  // TODO: Generate a random direction. Stub implemented for now
  return DIRECTIONS.RIGHT
}
export const getRandomContinuousCoordinates = async (
  numberOfCoordinates,
  gridDimensions,
  retries = 0
) => {
  // TODO: Generate a random array of coordinates (i.e. arrays of [x, y]) which are continuous & of size `numberOfCoordinates`
  // Stub implemented for now
  return [
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
  ]
}
export const getRandomGameSize = async () => {
  // TODO: Generate a random game size between 10x10 and 20x20. Stub implemented for now
  return [10, 10]
}
