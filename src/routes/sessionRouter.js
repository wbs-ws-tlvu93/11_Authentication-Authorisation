import { Router } from 'express';

const sessionRouter = Router();

sessionRouter.get('/setname', function (req, res) {
  req.session.name = 'John Doe';
  res.send(`Hello ${req.session.name}`);
});

sessionRouter.get('/getname', function (req, res) {
  res.send(req.session.name);
});

export default sessionRouter;
