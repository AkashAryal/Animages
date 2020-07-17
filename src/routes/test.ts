// root route: /test
import express, { Router } from 'express';
import { UserController } from '../typeORM/controller/UserController'
import { getConnection } from 'typeorm';
let router: Router = express.Router();
// route: /test/yo
router.get('/yo', function (req, res, next) {
  res.send({ id: "hello" });
});

router.get('/add', async function (req, res, next) {
  const uc = new UserController(getConnection().manager);
  await uc.insertUser("kamieeee", "pass123").catch(e => {
    console.log("error when adding user", e);
    res.status(400);
    res.send({ message: "error" });
  });
  res.status(200);
  res.send({ message: "done" });
});

export { router }