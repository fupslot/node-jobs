const express = require("express");
const cors = require("cors");

const logger = require("./logger");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(logger("dev"));

app.set("strict routing", true);
app.set("query parser", false);
app.use(express.json({ strict: true }));

module.exports = app;
