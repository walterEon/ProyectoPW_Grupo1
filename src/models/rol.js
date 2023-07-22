import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'

const Rol = sequelize.define('roles', {
    idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING
    }
})

export default Rol;