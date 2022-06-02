import { Router } from 'express';
import jwt from 'jsonwebtoken';
import loginSchema from '../joi/loginSchemaJoi.js';
import validateJOI from '../middleware/validateJOI.js';

import verify from '../middleware/privateRoute.js';
import generateAccessToken from '../utils/generateAccesToken.js';

const jwtRouter = Router();

jwtRouter.get('/login', (req, res) => {
  res.render('pages/login', { route: 'jwt' });
});

jwtRouter.post('/connect', validateJOI(loginSchema), (req, res) => {
  const { username, password } = req.body;

  if (username === 'John' && password === 'Doe') {
    console.log('Authenticated!');

    const accessToken = generateAccessToken(username);
    res.header('Authorization', accessToken).render('pages/checkJWTpage');

    //.json({ accessToken: accessToken });

    return;
  }

  res.status(400).render('pages/login_jwt', { route: 'jwt' });
});

jwtRouter.post('/checkJWT', (req, res) => {
  const { JWT_TOKEN } = req.body;

  try {
    const verified = jwt.verify(JWT_TOKEN, process.env.TOKEN_SECRET);
    if (verified) {
      req.user = verified;
      res.header('Authorization', JWT_TOKEN).redirect('/jwt/admin');
    }
  } catch (e) {
    res.redirect('login');
  }
});

jwtRouter.get('/admin', verify, (req, res) => {
  res.send('Admin site');
});

export default jwtRouter;
