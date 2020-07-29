import express, { Router } from 'express';
import { UserController } from '../typeORM/controller/UserController';
import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { JWT_SEC_TOKEN } from '../servConsts';

let router: Router = express.Router();

router.post('/', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const uc = new UserController(getConnection().manager);

  if (!uc.usernameExists(username)) return res.status(400).send({ error: "uname taken" });

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const idOfUser = await uc.insertUser(username, hashedPass)
    .catch((e) => {
      console.log(e);
      res.status(400).send({ error: e });
    });

  const token = jwt.sign({ id: idOfUser }, JWT_SEC_TOKEN);
  res.header("Access-Control-Expose-Headers", "authToken");
  res.header('authToken', token);
  return res.status(200).send({ authToken: token });
});


export { router }