// Load environment variable from .env file if not supplied
const path = require("path");
require("dotenv").config({
  path:
    typeof process.env.DOTENV_PATH !== "undefined"
      ? path.resolve(process.cwd(), process.env.DOTENV_PATH)
      : path.resolve(process.cwd(), ".env"),
});

// --- Start ---
const _ = require("lodash");
const express = require("express");
const morgan = require("morgan");

const app = express();

const pretty = require("./utils/pretty");
const jwtExpress = require("express-jwt");
const jwt = require("jsonwebtoken");
const loadPrivateKey = require("./utils/loadPrivateKey");

const { certPrivate, certPublic } = loadPrivateKey();

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get(
  "/my-profile",
  jwtExpress({
    secret: certPublic,
    algorithms: ["RS256"],
    requestProperty: "auth",
  }),
  (req, res, next) => {
    if (!req.auth) {
      return res.sendStatus(403);
    }
    next();
  },
  (req, res) => {
    res.send("Home Page");
  }
);

app.get("/sign/:id", (req, res) => {
  res.type("text/plain");
  const result = jwt.sign(
    {
      userId: req.params.id,
    },
    certPrivate,
    { algorithm: "RS256" }
  );
  res.send(result);
});

app.get("/public", (req, res) => {
  res.type("text/plain");
  res.send(certPublic);
});

app.use((req, res, next) => {
  next(new Error(errorDescriptor(ERROR_PAGE_NOT_FOUND)));
});

app.use((error, req, res, next) => {
  let errorOut = {};
  let parsed = {};
  try {
    parsed = JSON.parse(error.message);
    errorOut = {
      ...parsed,
    };
  } catch (e) {
    console.log(
      "[API - ERROR] Unknown error, unable to parse the error key, code and message:"
    );
    console.error(error);
    errorOut.code = 500;
    errorOut.key = "INTERNAL_SERVER_ERROR";
    errorOut.message = error.message;
  }

  const ip =
    _.get(req, "headers.x-forwarded-for") ||
    _.get(req, "connection.remoteAddress");

  res.setHeader("Content-Type", "application/json");
  res.status(errorOut.code).send(
    pretty({
      error: 1,
      errors: [{ ...errorOut }],
      data: null,
    })
  );
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
