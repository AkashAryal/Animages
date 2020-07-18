import express, { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserController } from '../typeORM/controller/UserController';
import { getConnection } from 'typeorm'
import { JWT_SEC_TOKEN } from '../servConsts'
let router: Router = express.Router();

router.post('/', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const uc = new UserController(getConnection().manager);

  const user = await uc.getUserByNameOrNull(username);
  if (user === null) res.status(400).send({ error: "Invalid Credentials" });

  const validPass = await bcrypt.compare(password, user.password)
    .catch(e => {
      return res.status(400).send({ error: "Invalid Credentials" });
    });

  if (validPass == false)
    return res.status(400).send({ error: "Invalid Credentials" });

  const token = jwt.sign({ id: user.id }, JWT_SEC_TOKEN);
  res.header("Access-Control-Expose-Headers", "authToken");
  res.header('authToken', token);
  res.status(200).send({ authToken: token });
})


export { router }