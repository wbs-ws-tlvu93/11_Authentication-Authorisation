import jwt from 'jsonwebtoken';

export default function generateAccessToken(username) {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET, {
    expiresIn: '1800s',
  });
}
