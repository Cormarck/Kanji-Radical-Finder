import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export let Admin = sequelize.define("admins", {
        name: {
                type:       DataTypes.STRING,
                allowNull:  false,
                primaryKey: true,
              },
    password: {
                type:       DataTypes.STRING,
                allowNull:  false,
              },
});