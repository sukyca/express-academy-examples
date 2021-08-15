// Load environment variable from .env file if not supplied
const path = require('path');
require('dotenv').config({
  path: (typeof process.env.DOTENV_PATH !== 'undefined')
    ? path.resolve(process.cwd(), process.env.DOTENV_PATH)
    : path.resolve(process.cwd(), '.env'),
});

// --- Start ---
const express = require('express');
const morgan = require('morgan');
const jwtExpress = require('express-jwt');

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


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
})
