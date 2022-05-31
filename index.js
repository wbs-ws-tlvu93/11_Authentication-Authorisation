import express, { json, urlencoded } from 'express';
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

app.post('/connect', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  res.send('Lets see');
});

app.listen(port);
