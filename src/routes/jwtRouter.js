import { Router } from 'express';

import loginSchema from '../joi/loginSchemaJoi.js';
import validateJOI from '../middleware/validateJOI.js';

import verify from '../middleware/privateRoute.js';
import { loginUser, verifyToken } from '../controller/jwt_auth.js';

const jwtRouter = Router();

jwtRouter.get('/login', (req, res) => {
  res.render('pages/login', { route: 'jwt' });
});

jwtRouter.post('/connect', validateJOI(loginSchema), loginUser);

jwtRouter.post('/checkJWT', verifyToken);

jwtRouter.get('/admin', verify, (req, res) => {
  res.send('Admin site');
});

export default jwtRouter;
