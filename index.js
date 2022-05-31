import express from 'express';

// constants
const app = express();
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000);
