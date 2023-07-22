
import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Universidad from "./universidad.js"

const Carrera = sequelize.define('carreras', {
    idCarrera: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING
    },
    idUniversidad: {
        type: DataTypes.INTEGER
    }
})

Carrera.belongsTo(Universidad, {
    foreignKey: 'idUniversidad',
    targetId: 'idUniversidad'
})

Universidad.hasMany(Carrera, {
    foreignKey: 'idUniversidad',
    targetId: 'idUniversidad'
})


export default Carrera;