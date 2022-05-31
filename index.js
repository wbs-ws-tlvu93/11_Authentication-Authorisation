import express from 'express';
import session from 'express-session';

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

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/setname', function (req, res) {
  req.session.name = 'John Doe';
  res.send(`Hello ${req.session.name}`);
});

app.get('/getname', function (req, res) {
  res.send(req.session.name);
});

app.listen(port);
