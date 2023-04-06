const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController.js");
const contactController = require("./src/controllers/contactController.js");
const aboutController = require("./src/controllers/aboutController.js");

// Rotas da home
route.get("/", homeController.home);
route.post("/", homeController.sendForm);

// Rotas do contato
route.get("/contact", contactController.contact);

//Rota do sobre nós
route.get("/about", aboutController.about);

module.exports = route;
