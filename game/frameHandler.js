import { postRequest, putRequest } from "./makeRequest.js"
import { setTreatLocation } from "./gameMechanics.js"
import { validMove } from "./randomGenerators.js"

const BLANK_SPACE = "  "
const SNAKE_HEAD = "🐦"
const SNAKE = "🐍"
const TREAT = "🍬"
export const GAME_OVER_TEXT = "GAME OVER!"

export const getFrame = async (game) => {
  const [width, height] = game.dimensions
  const snakesCoordinates = game.id
    ? await (
        await putRequest("game", {
          id: game.id,
        })
      ).json()
    : []
  if (!(await validMove(game.dimensions, snakesCoordinates))) {
    await putRequest("endGame", {
      id: game.id,
    })
  }

  if (Array.isArray(snakesCoordinates)) {
    const snakesStrings = snakesCoordinates.map(
      (coordinate) => `${coordinate[0]},${coordinate[1]}`
    )
    if (
      snakesStrings.includes(
        `${game.treatCoordinate[0]},${game.treatCoordinate[1]}`
      )
    ) {
      game.treatCoordinate = await setTreatLocation(game.id, game.dimensions)
    }
    return Array.from({ length: height }, (_, h) =>
      Array.from({ length: width }, (_, w) =>
        w === game.treatCoordinate[0] && h === game.treatCoordinate[1]
          ? TREAT
          : snakesStrings.includes(`${w},${h}`)
          ? snakesStrings[snakesStrings.length - 1] === `${w},${h}`
            ? SNAKE_HEAD
            : SNAKE
          : BLANK_SPACE
      ).join("")
    ).join("")
  } else if (snakesCoordinates && snakesCoordinates.gameOver) {
    return GAME_OVER_TEXT.padEnd(width * height * 2, "  ")
  }
}
