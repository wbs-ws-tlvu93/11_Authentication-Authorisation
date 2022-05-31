import dotenv from 'dotenv';
dotenv.config();

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {},
};

export default sessionConfig;
