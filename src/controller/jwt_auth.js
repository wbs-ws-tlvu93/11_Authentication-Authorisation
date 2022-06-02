import generateAccessToken from '../utils/generateAccesToken.js';
import jwt from 'jsonwebtoken';

export const loginUser = (req, res) => {
  const { username, password } = req.body;

  // TODO: Replace with DB later
  if (username === 'John' && password === 'Doe') {
    // User has been found
    const accessToken = generateAccessToken(username);

    return res
      .header('Authorization', accessToken)
      .render('pages/checkJWTpage');
  }

  // Username and with password not found
  return res.status(400).render('pages/login', { route: 'jwt' });
};

export const verifyToken = (req, res) => {
  const { JWT_TOKEN } = req.body;

  try {
    const verified = jwt.verify(JWT_TOKEN, process.env.TOKEN_SECRET);
    if (verified) {
      req.user = verified;
      res.header('Authorization', JWT_TOKEN).redirect('/jwt/admin');
    }
  } catch (e) {
    console.log(e);
    res.redirect('login');
  }
};
