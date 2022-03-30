import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './components'

const { PORT = 3000 } = process.env;
const express = require("express");
const server = express();
const apiRouter = require("./api");
const morgan = require("morgan");
server.use(morgan("dev"));
require("dotenv").config();

server.use(express.json());
server.use("/api", apiRouter);

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

server.get("/add/:first/to/:second", (req, res, next) => {
  res.send(
    `<h1>${req.params.first} + ${req.params.second} = ${
      Number(req.params.first) + Number(req.params.second)
    }</h1>`
  );
});

// server.get("/", (req, res, next) => {
//     res.send(
//       <App />
//     );
//   });

ReactDom.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("app")
)

const { client } = require("./db");

client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});