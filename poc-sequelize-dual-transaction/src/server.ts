'use strict';
//import middleware/utilities
const express = require('express');
const helmet = require('helmet');
const parser = require('body-parser');

//import routes
import { createUserController } from './routes/createUser';

//instantiations/registrations
const app = express();
const port = process.env.PORT || 3006;
app.use(helmet());
app.use(parser.json());

//routes
createUserController('/create', app);

app.get('/', function (req: any, res: any, next: any) {
  res.json(Date.now());
});

//error handling
app.use((err, req, res, next) => {
  console.error(err);
  if (err.status === undefined || err.status === null) {
    res.status(500).end();
  } else {
    res.status(err.status).end();
  }
});

//3, 2, 1, go!
app.listen(port, () => {
  console.info(`Listening on port: ${port}`);
});
