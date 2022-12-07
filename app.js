require("dotenv").config();
const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");

const app = express();

app.use(express.json());

app.use(notFoundMiddleware);
