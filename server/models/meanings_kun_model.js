import { /*Sequelize,*/ DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const Meaningkun = sequelize.define("meanings_kun", {
        reading_kun: {
                        type: DataTypes.STRING,
                        allowNull: false,
        },
        reading_rom: {
                        type: DataTypes.STRING,
                        allowNull: false,
        },
        meaning: {
                        type: DataTypes.STRING,
                        allowNull: false,
        }
   },
{
        timestamps:false
}
);