// const express = require('express') //ES5
import * as dotenv from "dotenv";
import dataSource from "./lib/datasource";
import WilderController from "./controller/Wilder";
dotenv.config();

import express from "express"; //ES6
const app = express(); //instanciation d'express

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async function (req, res) {
  let wilders = await new WilderController().listWilders();
  res.json({ wilders });
});

app.get("/wilders/:id", async function (req, res) {
  const { id } = req.params;
  let wilder = await new WilderController().findWilder(id);
  res.json({ wilder });
});

app.post("/wilders/create", async function (req, res) {
  console.log("req", req.body);
  const { first_name, last_name, age } = req.body;
  let wilder = await new WilderController().createWilder(
    first_name,
    last_name,
    age
  );
  res.json({ wilder });
});

app.patch("/wilders/update/:id", async function (req, res) {
  const { id } = req.params;
  const { first_name, last_name, age } = req.body;
  let wilder = await new WilderController().updateWilder(
    first_name,
    last_name,
    age,
    id
  );
  res.json({ wilder });
});

app.delete("/wilders/delete", async function (req, res) {
  const { id } = req.body;
  let objet = {};
  try {
    let result = await new WilderController().deleteWilder(id);

    if (result.affected === 0) {
      objet = { success: false, message: "Le wilder n'existe pas" };
    } else {
      objet = { success: true, message: "Wilder supprimé" };
    }
    return res.json(objet);
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});
const start = async () => {
  await dataSource.initialize();
  app.listen(process.env.PORT, () => {
    console.log(`Serveur lancé sur le port ${process.env.PORT}`); //es6
  });
};

start();
