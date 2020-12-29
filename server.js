// import express module, morgan module, express app object, and use morgan middle ware
require("dotenv").config;
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const app = express();

// this fill is access by node by hidden to a file management systne
const API_TOKEN = process.env.API_TOKEN;
console.log(API_TOKEN);

app.use(morgan("dev"));

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

  res.json([
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
  ]);
};

function validateBearerToken() {
  // verify bearer toekn header
  //vrerify token matches our secret ornot
  // all validation passed, move to next middleware on piple∞¢
}

// use the express app object and the function as a paramter to perform GET request
app.get("/types", handleGetTypes);
app.get("/valid-types", handleGetTypes);

app.listen(8000, () => console.log("Server on 8000"));
