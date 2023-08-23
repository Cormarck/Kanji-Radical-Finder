import {sequelize} from "../models/index.js";
// Models importieren
import {Admin} from "../models/admin.js";

let createAdmin = function () {
    Admin.create({
        name: ""/* Name einfügen*/ ,
        password: "" /*Passwort einfügen*/,
    })
    .then(() => {console.log("admin wurde erstellt")})
};


sequelize.sync(/*{force: true} */)
.then( () => console.log("Tabelle erstellt"))
.then( () => {createAdmin()});
