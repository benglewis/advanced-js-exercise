import { postRequest } from "./makeRequest.js"
import {
  getRandomContinuousCoordinates,
  getRandomDirection,
  getRandomGameSize,
} from "./randomGenerators.js"

export const DIRECTIONS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
}

const START_SIZE = 4

export const setTreatLocation = async (gameId, dimensions) => {
  const newTreatCoordinate = await getRandomContinuousCoordinates(
    1,
    dimensions
  )[0]
  await postRequest("treat", {
    id: gameId,
    treatCoordinate: newTreatCoordinate,
  })
  return newTreatCoordinate
}

export const createGame = async () => {
  const dimensions = await getRandomGameSize()
  const snakeCoordinates = await getRandomContinuousCoordinates(
    START_SIZE,
    dimensions
  )
  const snakeDirection = await getRandomDirection()
  const treatCoordinate = (
    await getRandomContinuousCoordinates(4, dimensions)
  )[0]

  const game = {
    dimensions,
    snakeCoordinates,
    snakeDirection,
    treatCoordinate,
  }
  console.log(`Creating game ${JSON.stringify(game)}`)
  return {
    id: await (await postRequest("game", game)).text(),
    ...game,
  }
}
