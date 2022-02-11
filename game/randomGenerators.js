import { spawn, Worker } from "threads"

const randomWorker = await spawn(new Worker("./randomWorker"))

const MAX_RETRIES = 5

export const validMove = async (gridDimensions, coordinates) => {
  return await randomWorker.validMove(gridDimensions, coordinates)
}

export const getRandomDirection = async () => {
  return await randomWorker.generateRandomDirection()
}
export const getRandomContinuousCoordinates = async (
  numberOfCoordinates,
  gridDimensions,
  retries = 0
) => {
  // Stub implemented for now
  const [gridWidth, gridHeight] = gridDimensions
  const firstCoordinate = await randomWorker.generateCoordinate(
    gridWidth,
    gridHeight
  )
  const coordinates = await Array.from({
    length: numberOfCoordinates - 1,
  }).reduce(
    async (accP) => {
      const acc = await accP
      return [
        ...acc,
        await randomWorker.generateConnectedCoordinate(acc[acc.length - 1]),
      ]
    },
    [firstCoordinate]
  )

  if (validMove(gridDimensions, coordinates)) {
    return coordinates
  } else if (retries <= MAX_RETRIES) {
    return await getRandomContinuousCoordinates(
      numberOfCoordinates,
      gridDimensions,
      retries + 1
    ) // Retry
  } else {
    throw Error("Failed to find a valid location to place the snake!")
  }
}
export const getRandomGameSize = async () => {
  return randomWorker.generateRandomGridSize()
}
