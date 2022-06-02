import dotenv from 'dotenv';
dotenv.config();
import express, { json, urlencoded } from 'express';
import session from 'express-session';
import sessionConfig from './config/session.js';
import sessionRouter from './src/routes/sessionRouter.js';
import jwtRouter from './src/routes/jwtRouter.js';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import './src/db/index.js';

// constants
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.set('view engine', 'ejs');
app.set('views', dirname(fileURLToPath(import.meta.url)) + '/src/views');
app.use(cors());

//app.use(json());
app.use(urlencoded({ extended: true }));
app.use(session(sessionConfig));

// Routes
app.use('/session', sessionRouter);
app.use('/jwt', jwtRouter);

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(port);
