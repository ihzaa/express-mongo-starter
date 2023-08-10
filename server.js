import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import { connection } from './connection.js'

const env = dotenv.config().parsed;
const app = express();

app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: env.BASE_FRONTEND_URL
}));

// ADD ROUTE START
const rootRoutePath = "./routes/api/";
import importRoute from "./routes/api/index.js"
importRoute(app, rootRoutePath);
// ADD ROUTE END

// connect to monggo db
connection().then(() => {
  app.listen(env.SERVER_PORT, () => {
    console.log("Server running in port: " + env.SERVER_PORT);
  });
});

