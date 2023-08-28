import {sequelize} from "../models/index.js";
// Models importieren
import {Admin} from "../models/admin.js";

let adminName = ""

let deleteAdmin = async function () {
    let target = await Admin.findOne({
        where: {
            name : adminName,
        }
    })
    target.destroy();
};


sequelize.sync(/*{force: true} */)
.then( () => console.log("Tabelle erstellt"))
.then( () => {deleteAdmin()});
