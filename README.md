# Advanced JS exercise

## Setup Node.JS

[Install the latest Node.JS LTS (currently 16.13, this exercise requires at least >=12.22.0) for your OS](https://nodejs.org/en/download/)

## Fix my broken code

In this section, you have various broken files that are available in the folder `./broken`. You must fix each file as described in the comments. See the [README](./broken/README.md) for the links to each file.

## Time to play...

In this section, you have to build the engine that powers a game that we will complete in the React exercise. The code for this exercise sits in the `./game` folder.

### Setup

Run `npm i` to install the requirements for this section.

### Here are the requirements

1. You are building the logic for an game of snake. Your goal is to create three functions:
   1. A function which validates whether a location is currently occupied by the snake's tail and inside the grid, i.e. a valid location to either place a treat or move the snake. This should in the `./game/gameMechanics.js` file.
   2. A function which generates a random valid location for a treat (e.g. an apple) given first function (i.e. it verifies that the treat won't be on the snake's tail). This should in the `./game/gameMechanics.js` file.
   3. A function that generates a random direction for the snake to start facing. This should be in the file `./game/randomGenerators.js`
   4. A function that generates a random set of snake coordinates for the game to start. This should be in the file `./game/randomGenerators.js`.
   5. A function that generates a random game size (from 10x10 up to 50x50). This should be in the file `./game/randomGenerators.js`.
   6. A function that presents a valid frame of the game. This should be in the file `./game/frameHandler.js`.
   7. A function that should create a game instance. This should be in the file `./game/gameMechanics.js`.
2. Your code will be run using the code in `runGame.js`, which uses [terminal-game-io](https://www.npmjs.com/package/terminal-game-io) to get inputs and draw the game and should work in Node.JS and the browser, but you only need to run the Node.JS version.
3. Your application logic must run in a separate thread in order to guarantee that your function calls do not lock the main loop.

Note: You are given some additional tools to make this do-able within the time-frame given.

### Here are your tools

You have been given a service which allows you to:

1. Create a new game instance given grid dimensions, the snake's starting coordinates, it's direction
   & a starting treat coordinate (POST `/createGame`) which returns a game ID.
2. Check the location of the snake or treat (GET `/getSnakeCoordinates` or `getTreatCoordinate` appropriately) when given a game ID.
3. Check the grid size (GET `/checkGridSize`) when given a game ID.
4. Update the coordinates of the snake (PUT `/updateSnakeCoordinates`) for a given game (given it's ID).
5. Update snake direction & location (PUT `/updateSnakeCoordinates+Direction`) for a given game (given it's ID).
6. Eat a treat (POST `/collectedTreat`), updating the count for treats eaten (& hence the length of the snake),
   & storing a new treat coordinate for a given game (given it's ID).

This service is executed with `node ./game/gameService.js`.

You have also been given a set of tools to call this service with GET, PUT and POST in the `./game/makeRequest.js` file.

### Advice

- The service given to you runs on `http://localhost:3000` (port 3000 by default, but whatever you define as the environment variable PORT will also work)
- The service logs for you a notice of where it's internal MongoDB is listening (the port changes each time it is run and the DB is emptied), so that you can see using MongoDB Atlas what has been saved there if you're not sure if something is working.
- The service also logs requests to it's console.
