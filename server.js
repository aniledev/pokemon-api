require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const POKEDEX = require("./pokedex.json");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

const morganSetting = process.env.NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganSetting));
// this middleware hides some specific request headers to make sure your application isn't more susceptible to attacks
app.use(helmet());
app.use(cors());

// use function as middleware to validate authorization headers and token
app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");

  // validate the authorization header to match the process token as well as make sure a token is present
  if (!authToken || authToken !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  //move on to the next middleware
  next();
});

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

  res.json(response);
};

app.get("/types", handleGetTypes);
app.get("/pokemon", handleGetPokemon);

app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { error };
  }
  res.status(500).json(response);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
