import {sequelize} from "../models/index.js";
// Models importieren
import {Admin} from "../models/admin.js";

let createAdmin = function () {
    Admin.create({
        name: "Marc"/* Name einfügen*/ ,
        password: "1203" /*Passwort einfügen*/,
    })
    .then(() => {console.log("admin wurde erstellt")})
};


sequelize.sync(/*{force: true} */)
.then( () => console.log("Tabelle erstellt"))
.then( () => {createAdmin()});
