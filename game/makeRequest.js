import fetch from "node-fetch"

const PORT = process.env.PORT || 3000

export const requestWithBody = (endpoint, method, body) =>
  fetch(`http://localhost:${PORT}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  })

/** Example of usage:
 *
 * const dimensions = [10, 10]
 * const snakeCoordinates = [
 *   [2, 3],
 *   [2, 6],
 * ]
 * const snakeDirection = DIRECTIONS.LEFT
 * const treatCoordinate = [1, 2]
 *
 * const gameId = (
 *   await (
 *     await postRequest(`createGame`, {
 *       dimensions,
 *       snakeCoordinates,
 *       snakeDirection,
 *       treatCoordinate,
 *     })
 *   ).text()
 * )
 *
 */
export const postRequest = (endpoint, body) =>
  requestWithBody(endpoint, "POST", body)
export const putRequest = (endpoint, body) =>
  requestWithBody(endpoint, "PUT", body)

/**
 * Example of request
 *
 * const snakeCoordinatesReq = await getRequest("getTreatCoordinate", {
 *   id: gameId,
 * })
 * if (snakeCoordinatesReq.status === 200) {
 *   console.log(await snakeCoordinatesReq.json())
 * } else {
 *   console.error("Game not found")
 * }
 */
export const getRequest = (endpoint, params) =>
  fetch(`http://localhost:${PORT}/${endpoint}?${new URLSearchParams(params)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
