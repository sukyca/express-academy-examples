// Load environment variable from .env file if not supplied
const path = require('path');
require('dotenv').config({
  path: (typeof process.env.DOTENV_PATH !== 'undefined')
    ? path.resolve(process.cwd(), process.env.DOTENV_PATH)
    : path.resolve(process.cwd(), '.env'),
});

// --- Start ---
const _ = require('lodash');
const express = require('express');
const morgan = require('morgan');
const jwtExpress = require('express-jwt');

const colors = require('colors');
const { wrap } = require('./../src/utils/asyncMiddleware');

const pretty = require('./../src/utils/pretty');
const { delay } = require('./../src/utils/delay');

const { ERROR_PAGE_NOT_FOUND, errorDescriptor } = require('./../src/errors');

const { customCORSAndAuthErrorMiddleware } = require('./../src/utils/customMiddleware');

const app = express();

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/users',
  jwtExpress({
    secret: '!secret_that_I_cant_share!',
    algorithms: ['HS256'],
    requestProperty: 'auth', // Default is 'user'
  }),
  customCORSAndAuthErrorMiddleware,
  (req, res, next) => {
    if (!req.auth) {
      return res.sendStatus(403);
    }
    next()
  }, 
  (req, res) => {
  res.send(`Users Page! ${JSON.stringify(req.auth)}`);
})


// Handle 404 and 505
// The 404 Route (ALWAYS Keep this as the last route)
app.use((req, res, next) => {
  // Due awesome error handler we can just throw custom 404 error object.
  next(new Error(errorDescriptor(ERROR_PAGE_NOT_FOUND)));
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  // Try to parse the error, if unable log it and set it to default one.
  let errorOut = {};
  let parsed = {};
  try {
    parsed = JSON.parse(error.message);
    errorOut = {
      ...parsed,
    };
  } catch (e) {
    console.log('[API - ERROR] Unknown error, unable to parse the error key, code and message:'.bgYellow.black);
    console.error(error);
    errorOut.code = 500;
    errorOut.key = 'INTERNAL_SERVER_ERROR';
    errorOut.message = error.message;
  }

  // Audit the API errors
  // Get IP
  const ip = _.get(req, 'headers.x-forwarded-for') || _.get(req, 'connection.remoteAddress');

  // Send the response to the client
  res.setHeader('Content-Type', 'application/json');
  res.status(errorOut.code).send(pretty({
    error: 1,
    errors: [
      { ...errorOut },
    ],
    data: null,
  }));
});


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
})
