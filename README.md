## Animages
This project allows you to browse various booru image boards in one location. 
Frontend uses react with the redux-toolkit. Images utilize lazy loading
The backend uses nodejs + express with typescript along with typeORM for the mysql database.
Authentication is done with jwt.

## Available Scripts

To start the client in the project directory, you can run:
`npm run start`

To start the server run `npm run dev` in the server directory

Note for this project we use typeORM with mysql. The config information is located at 
`server/ormconfig.json`. 

If you get an error form typeORM about the db not existing, create an intial empty db
matching info in ormconfig.json.
