This project allows you to browse various booru image boards in one location

## Available Scripts

To start the client in the project directory, you can run:
`npm run start`

To start the server run 
`npm run dev`

Note for this project we use typeORM with mysql. The config information is located at 
`server/ormconfig.json`. 

If you get an error form typeORM about the db not existing, create an intial empty db
matching info in ormconfig.json.