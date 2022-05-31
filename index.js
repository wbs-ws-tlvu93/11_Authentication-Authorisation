import express, { json, urlencoded } from 'express';
import session from 'express-session';
import loginSchema from './src/joi/loginSchemaJoi.js';
import validateJOI from './src/middleware/validateJOI.js';
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
app.set('view engine', 'ejs');

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(session(sess));

app.use('/', sessionRouter);

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/login', function (req, res) {
  res.render('pages/login');
});

app.post('/connect', validateJOI(loginSchema), (req, res) => {
  const { username, password } = req.body;

  if (username === 'John' && password === 'Doe') {
    console.log('Authenticated!');
    req.session.isConnected = true;
    res.status(200).end();
    return;
  }

  res.status(400).render('pages/login');
});

app.get('/admin', (req, res) => {
  if (req.session.isConnected) {
    res.send('Admin site');
  }

  res.status(401).end();
});

app.get('/logout', (req, res) => {
  if (req.session.isConnected) req.session.isConnected = false;
  res.status(200).end();
});

app.listen(port);
