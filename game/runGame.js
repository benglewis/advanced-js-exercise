import TerminalGameIo from "terminal-game-io"

import { createGame } from "./gameMechanics.js"
import { getFrame, GAME_OVER_TEXT } from "./frameHandler.js"
import { moveDown, moveUp, moveLeft, moveRight } from "./keyHandler.js"

const { Key, createTerminalGameIo } = TerminalGameIo

const FPS = 1 // You can customize this to change the speed of your game
const UNICODE_CHAR_MULTIPLIER = 2 // Emoji use two chars

const frameHandler = async (instance) => {
  if (!instance.game) {
    instance.game = await createGame()
  }

  const frameData = await getFrame(instance.game)
  if (frameData && frameData.length > 0) {
    instance.drawFrame(
      frameData,
      instance.game.dimensions[0] * UNICODE_CHAR_MULTIPLIER,
      instance.game.dimensions[1]
    )
  }
  if (frameData.includes(GAME_OVER_TEXT)) {
    instance.exit()
  }
}

const keypressHandler = (instance, keyName) => {
  switch (keyName) {
    case Key.ArrowDown:
      moveDown(instance.game.id)
      break
    case Key.ArrowUp:
      moveUp(instance.game.id)
      break
    case Key.ArrowLeft:
      moveLeft(instance.game.id)
      break
    case Key.ArrowRight:
      moveRight(instance.game.id)
      break
    case Key.Escape:
      instance.exit()
      break
    case Key.C:
      instance.exit()
      break
  }
}

createTerminalGameIo({
  fps: FPS,
  frameHandler,
  keypressHandler,
})
