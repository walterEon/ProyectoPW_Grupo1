import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Persona from "./persona.js"

const Horario = sequelize.define('horarios', {
    idHorario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idPersona: {
        type: DataTypes.INTEGER
    },
    horaInicio: {
        type: DataTypes.TIME
    },
    diaSemana: {
        type: DataTypes.STRING
    },
    horaFin: {
        type: DataTypes.TIME
    }
})

Horario.belongsTo(Persona, {
    foreignKey: 'idPersona',
    targetId: 'idPersona'
})

Persona.hasMany(Horario, {
    foreignKey: 'idPersona',
    targetId: 'idPersona'
})


export default Horario;