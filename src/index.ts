import express, { Request, Response } from "express";
import cors from 'cors';
import morgan from 'morgan';
import cookieParse from 'cookie-parser';
import { router as testRouter } from './routes/test';
import { router as loginRouter } from './routes/login';
import { router as registerRouter } from './routes/register';
import { router as favRouter } from './routes/favorite';
import { initDB } from './typeORM/index';
import path from 'path';

export const app: express.Application = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParse());
initDB();

app.use("/api/test", testRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/fav", favRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../client", "build")));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  })
}

//Capture All 404 errors
/*app.use(function (req: Request, res: Response) {
  res.status(404).send('Unable to find the requested resource!');
});*/

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});