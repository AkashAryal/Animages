import express, { Router, Request } from 'express';
import { auth } from './verifyToken';
import { UserController } from '../typeORM/controller/UserController';
import { getConnection } from 'typeorm'
import { User } from '../typeORM/entity/User';
let router: Router = express.Router();

router.post("/favorite", auth, async function (req: any, res) {
  const idOfUser = req.user.id;
  const uc = new UserController(getConnection().manager);

  uc.addFavoriteByUserId(idOfUser, req.body.imgUrl);
  res.status(200).send({ message: "Ok" });
});

router.post("/unfavorite", auth, async function (req: any, res) {
  const idOfUser = req.user.id;
  const uc = new UserController(getConnection().manager);

  uc.removeFavoriteByUserId(idOfUser, req.body.imgUrl);
  res.status(200).send({ message: "Ok" });
});

//is immgUrl part od user's fav array
router.post("/isFav", auth, async function (req: any, res) {
  const idOfUser = req.user.id;
  const uc = new UserController(getConnection().manager);
  const has = await uc.hasFavoriteByUserId(idOfUser, req.body.imgUrl);

  if (has) {
    console.log("true /isFav");

    res.status(200).json({ data: true })
  } else {
    console.log("false /isFav");
    res.status(200).json({ data: false });
  }

});

router.get('/getFavs', auth, async function (req: any, res) {
  const idOfUser = req.user.id;
  const uc = new UserController(getConnection().manager);
  const favImgUrls = await uc.getFavImgUrls(idOfUser);
  res.status(200).json({ data: favImgUrls })
});

export { router }
