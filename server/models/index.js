// Sequelize Setup
import { Sequelize/*, DataTypes */} from "sequelize";

// für Storage Path
import { dirname } from "path";
import { fileURLToPath } from "url";

let storePath = dirname(fileURLToPath(import.meta.url)) + "./../database.sqlite";

export const sequelize = new Sequelize(/*'database-name,'root','password',*/{
    dialect:    "sqlite",
    storage:    storePath // oben erzeugt / "host" für online hosted databases
});