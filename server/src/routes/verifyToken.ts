import jwt from "jsonwebtoken";
import { JWT_SEC_TOKEN } from '../servConsts';

//this is middlware 
//order of events:
// First a endpoint is called. From there if this middle
//ware is used for that end point then this fucntion (auth()) gets called. If we don't
//have a valid auth-token then we return (which returns from the orginal endpoint)
//If we have a valid one then we create a  field (.user) in the req obj and give
//it the  {id: idOfUser } obj that the token is holding. The next() function then
//returns execution to the original endpoint funtion.
export function auth(req, res, next) {
  const token = req.header("authToken");
  if (!token) {
    console.log("access denied by auth mw");
    return res.status(400).send({ error: "Access Denied" });
  }
  try {
    //verificed contains the {id: idOfUser } obj
    const verfied = jwt.verify(token, JWT_SEC_TOKEN);
    req.user = verfied;
    next();
  } catch (e) {
    console.log("access denied by auth mwit");
    res.status(400).send({ error: "Invalid Token" })
  }
}