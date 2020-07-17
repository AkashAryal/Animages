import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

export function initDB() {

    createConnection().then(async connection => {
        console.log("connected to db");
    }).catch(error => console.log(error));
}
