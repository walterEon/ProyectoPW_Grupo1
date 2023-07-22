import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Cita from "./cita.js"

const Calificacion = sequelize.define('calificaciones', {
    idCalificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idCita: {
        type: DataTypes.INTEGER
    },
    calificacion: {
        type: DataTypes.INTEGER
    },
    comentario: {
        type: DataTypes.STRING
    }
})

Calificacion.belongsTo(Cita, {
    foreignKey: 'idCita',
    targetId: 'idCita'
})

Cita.hasOne(Calificacion, {
    foreignKey: 'idCita',
    targetId: 'idCita'
})


export default Calificacion;