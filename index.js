import * as dotenv from "dotenv";
import dataSource from "./lib/datasource";
import { wilders, languages } from "./routes";

dotenv.config();

import express from "express"; //ES6
const app = express(); //instanciation d'express

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/wilders", wilders);
app.use("/languages", languages);

const start = async () => {
  await dataSource.initialize();
  app.listen(process.env.PORT, () => {
    console.log(`Serveur lancé sur le port ${process.env.PORT}`); //es6
  });
};

start();
