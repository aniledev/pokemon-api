// import express module, morgan module, express app object, and use morgan middle ware
// require the dotenv file as early as possible; this module allows the .env file to be read and process.env variables to be written
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const POKEDEX = require("./pokedex.json");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());

// use function as middleware to validate authorizion headers and token
app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");

  console.log(apiToken);
  console.log(authToken);

  console.log("validate bearer token middleware");

  // validate the authorization header to match the process token as well as make sure a token is present
  if (!authToken || authToken !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  //move on to the next middleware
  next();
});

// array of valid pokemon types
const validTypes = [
  `Bug`,
  `Dark`,
  `Dragon`,
  `Electric`,
  `Fairy`,
  `Fighting`,
  `Fire`,
  `Flying`,
  `Ghost`,
  `Grass`,
  `Ground`,
  `Ice`,
  `Normal`,
  `Poison`,
  `Psychic`,
  `Rock`,
  `Steel`,
  `Water`,
];

// create a function that handles the req and res callback function
const handleGetTypes = (req, res, next) => {
  // The search options for either name or type are provided in query string parameters
  // When searching by name, users are searching for whether the Pokemon's name includes a specified string. The search should be case insensitive.
  //When searching by type, users must specify one of the valid types

  res.json(validTypes);
};

const handleGetPokemon = (req, res, next) => {
  let response = POKEDEX.pokemon;

  // read the req.query object; provide default values that are
  const { name = "", type } = req.query;

  // filter our pokemon by name if name query param is present
  if (name) {
    response = response.filter((pokemon) =>
      // case insensitive searching
      pokemon.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // filter our pokemon by type if type query param is present
  if (type) {
    response = response.filter((pokemon) => pokemon.type.includes(type));
  }

  // return the new arrays based on validations
  res.json(response);
};

// use the express app object and the function as a paramter to perform GET request
// a function passed into another function is a callbck
app.get("/types", handleGetTypes);
app.get("/pokemon", handleGetPokemon);

app.listen(8000, () => console.log("Server on 8000"));
