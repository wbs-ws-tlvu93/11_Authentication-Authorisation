import { Router } from 'express';
import loginSchema from '../joi/loginSchemaJoi.js';
import validateJOI from '../middleware/validateJOI.js';

const sessionRouter = Router();

sessionRouter.get('/setname', function (req, res) {
  req.session.name = 'John Doe';
  res.send(`Hello ${req.session.name}`);
});

sessionRouter.get('/getname', function (req, res) {
  res.send(req.session.name);
});

sessionRouter.get('/login', function (req, res) {
  res.render('pages/login', { route: 'session' });
});

sessionRouter.post('/connect', validateJOI(loginSchema), (req, res) => {
  const { username, password } = req.body;

  if (username === 'John' && password === 'Doe') {
    console.log('Authenticated!');
    req.session.isConnected = true;
    res.status(200).end();
    return;
  }

  res.status(400).render('pages/login');
});

sessionRouter.get('/admin', (req, res) => {
  if (req.session.isConnected) {
    res.send('Admin site');
  }

  res.status(401).end();
});

sessionRouter.get('/logout', (req, res) => {
  if (req.session.isConnected) req.session.isConnected = false;
  res.status(200).end();
});

export default sessionRouter;
