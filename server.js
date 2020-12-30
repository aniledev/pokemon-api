// import express module, morgan module, express app object, and use morgan middle ware
// require the dotenv file as early as possible; this module allows the .env file to be read and process.env variables to be written
require("dotenv").config;
const express = require("express");
const morgan = require("morgan");
const API_TOKEN = process.env.API_TOKEN;
const fs = require("fs");
const app = express();

// this fill is access by node by hidden to a file management systne

app.use(morgan("dev"));
app.use(function validateBearerToken(req, res, next) {
  console.log("validate bearer token middleware");
  //move on to the next middleware
  next();
});
console.log(API_TOKEN);
console.log(process.env.API_TOKEN);

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
const handleGetTypes = (_req, res, _next) => {
  // The search options for either name or type are provided in query string parameters
  // When searching by name, users are searching for whether the Pokemon's name includes a specified string. The search should be case insensitive.
  //When searching by type, users must specify one of the valid types

  res.json(validTypes);
};

const handleGetPokemon = (_req, res, _next) => {
  res.send("Hello Pokemon!");
};

// a middleware function
function validateBearerToken(_req, res, _next) {
  // verify bearer toekn header
  //vrerify token matches our secret ornot
  // all validation passed, move to next middleware on piple∞¢
}

// use the express app object and the function as a paramter to perform GET request
// a function passed into another function is a callbck
app.get("/types", handleGetTypes);
app.get("/pokemon", handleGetPokemon);

app.get("/valid-types", handleGetTypes);

app.listen(8000, () => console.log("Server on 8000"));
