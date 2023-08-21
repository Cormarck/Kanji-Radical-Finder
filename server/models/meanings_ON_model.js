import { /*Sequelize,*/ DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const MeaningON = sequelize.define("meanings_ON", {
        reading_ON: {
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