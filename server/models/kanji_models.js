// Erstellt Model "Kanji"
import { /*Sequelize,*/ DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const Kanji = sequelize.define("kanjis", {
            symbol: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        primaryKey: true,
                    },
            strokes: {
                        type: DataTypes.NUMBER,
                        allowNull: false,
            },
            /*reading_kun: {
                        type: DataTypes.STRING,
                        allowNull: false,
            },
            reading_ON: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            meaning: {
                        type: DataTypes.STRING,
                        allowNull: false,
            },*/
            radikals: {
                        type: DataTypes.STRING,
                        allowNull: false,
            } 
        },
        {
                timestamps:false
        }
);