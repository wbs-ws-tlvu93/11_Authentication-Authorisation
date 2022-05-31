import express from 'express';
import session from 'express-session';
import sessionRouter from './src/routes/sessionRouter.js';

// constants
const app = express();
const port = process.env.PORT || 3000;

const sess = {
  secret: '1O4HtWqqZ0',
  resave: false,
  saveUninitialized: true,
  cookie: {},
};

// Middlewares
app.use(session(sess));

app.use('/', sessionRouter);

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(port);
