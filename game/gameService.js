import path from "path"

import { MongoMemoryServer } from "mongodb-memory-server-core"
import { MongoClient, ObjectId } from "mongodb"
import express from "express"
import morgan from "morgan"
import fsextra from "fs-extra"

const GAME = "game"

const DB_PATH = path.join(process.cwd(), GAME, "db")
fsextra.exists(DB_PATH) || (await fsextra.mkdir(DB_PATH))
const DB_BINARY = path.join(process.cwd(), GAME, "db-binary")
fsextra.exists(DB_BINARY) || (await fsextra.mkdir(DB_BINARY))

const mongod = await MongoMemoryServer.create({
  instance: {
    dbPath: DB_PATH,
  },
  binary: {
    downloadDir: DB_BINARY,
  },
})

export const uri = mongod.getUri()
const client = new MongoClient(uri)
await client.connect()
const db = await client.db(GAME)
const games = db.collection("games")

console.log(`MongoDB running on URI ${uri}`)
const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(morgan("dev"))

app.get("/game", async (req, res) => {
  const game = await games.findOne({
    _id: new ObjectId(req.query.id),
  })

  res.json(game)
})

app.post("/game", async (req, res) => {
  const { dimensions, snakeCoordinates, snakeDirection, treatCoordinate } =
    req.body

  const result = await games.insertOne({
    dimensions,
    snakeCoordinates,
    snakeDirection,
    treatCoordinate,
    collectedTreats: 0,
    gameOver: false,
  })

  res.send(result.insertedId.toString())
})

const OFFSET_LOOKUP = {
  UP: [0, -1],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0],
}

app.put("/game", async (req, res) => {
  const {
    snakeDirection,
    snakeCoordinates: pastSnakeCoordinates,
    gameOver,
  } = await games.findOne({
    _id: new ObjectId(req.body.id),
  })
  if (!gameOver) {
    console.log(`Advancing snake in ${snakeDirection} direction`)
    const lastHead = pastSnakeCoordinates[pastSnakeCoordinates.length - 1]
    const offset = OFFSET_LOOKUP[snakeDirection]
    const newHead = [lastHead[0] + offset[0], lastHead[1] + offset[1]]

    const session = client.startSession()

    try {
      await session.withTransaction(async () => {
        await games.updateOne(
          { _id: new ObjectId(req.body.id) },
          {
            $pop: { snakeCoordinates: -1 },
          }
        )
        await games.updateOne(
          { _id: new ObjectId(req.body.id) },
          {
            $push: {
              snakeCoordinates: newHead,
            },
          }
        )
        const game = await games.findOne({ _id: new ObjectId(req.body.id) })
        const { snakeCoordinates } = game
        res.json(snakeCoordinates)
      })
    } finally {
      await session.endSession()
    }
  }
})

app.put("/endGame", async (req, res) => {
  await games.updateOne(
    { _id: new ObjectId(req.body.id) },
    { $set: { gameOver: true } }
  )
  console.log(`Game over ${req.body.id}`)
  res.json({ gameOver: true })
})

app.put("/snake-direction", async (req, res) => {
  res.json(
    await games.updateOne(
      { _id: new ObjectId(req.body.id) },
      {
        $set: {
          snakeDirection: req.body.snakeDirection,
        },
      }
    )
  )
})

app.post("/treat", async (req, res) => {
  const { snakeCoordinates } = await games.findOne({
    _id: new ObjectId(req.body.id),
  })
  const xOffset = snakeCoordinates[0][0] - snakeCoordinates[1][0]
  const yOffset = snakeCoordinates[0][1] - snakeCoordinates[1][1]
  res.json(
    await games.updateOne(
      { _id: new ObjectId(req.body.id) },
      {
        $inc: {
          collectedTreats: 1,
        },
        $set: {
          treatCoordinate: req.body.treatCoordinate,
        },
        $push: {
          snakeCoordinates: {
            $each: [[xOffset, yOffset]],
            $position: 0,
          },
        },
      }
    )
  )
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>
  console.log(`Game service listening at http://localhost:${PORT}`)
)

process.on("exit", async () => {
  await client.close()
  await mongod.stop()
})
