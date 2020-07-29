import parser from 'pg-connection-string';

let herokuURl: parser.ConnectionOptions = {
   host: "",
   port: "",
   user: "",
   password: "",
   database: ""
};

if (process.env.NODE_ENV === 'production') {
   console.log("in prod");

   herokuURl = parser.parse(process.env.DATABASE_URL);
}

module.exports = {
   "type": herokuURl.host === "" ? "mysql" : "postgres",
   "host": herokuURl.host || "localhost",
   "port": herokuURl.port || 3306,
   "username": herokuURl.user || "root",
   "password": herokuURl.password || "",
   "database": herokuURl.database || "animages",
   "synchronize": herokuURl != null ? false : false,
   "logging": false,
   "entities": [
      "src/typeORM/entity/**/*.ts"
   ],
   "migrations": [
      "src/typeORM/migration/**/*.ts"
   ],
   "subscribers": [
      "src/typeORM/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/typeORM/entity",
      "migrationsDir": "src/typeORM/migration",
      "subscribersDir": "src/typeORM/subscriber"
   }
}