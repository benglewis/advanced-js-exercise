import { putRequest } from "./makeRequest.js"

export const moveDown = async (gameId) => {
  await (
    await putRequest(`snake-direction`, {
      id: gameId,
      snakeDirection: "DOWN",
    })
  ).json()
}
export const moveUp = async (gameId) => {
  await (
    await putRequest(`snake-direction`, {
      id: gameId,
      snakeDirection: "UP",
    })
  ).json()
}
export const moveLeft = async (gameId) => {
  await (
    await putRequest(`snake-direction`, {
      id: gameId,
      snakeDirection: "LEFT",
    })
  ).json()
}
export const moveRight = async (gameId) => {
  await (
    await putRequest(`snake-direction`, {
      id: gameId,
      snakeDirection: "RIGHT",
    })
  ).json()
}
