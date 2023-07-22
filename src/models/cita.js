
import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Persona from "./persona.js"
import Curso from "./curso.js"

const Cita = sequelize.define('citas', {
    idCita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idPersonaDocente: {
        type: DataTypes.INTEGER
    },
    idPersonaAlumno: {
        type: DataTypes.INTEGER
    },
    fecha: {
        type: DataTypes.DATE
    },
    horaInicio: {
        type: DataTypes.TIME
    },
    horaFin: {
        type: DataTypes.TIME
    },
    enlaceSesion: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    },
    idCurso: {
        type: DataTypes.INTEGER
    }
})


Cita.belongsTo(Persona, {
    foreignKey: 'idPersonaAlumno',
    targetId: 'idPersona'
})

Cita.belongsTo(Persona, {
    foreignKey: 'idPersonaDocente',
    targetId: 'idPersona'
})



Cita.belongsTo(Curso, {
    foreignKey: 'idCurso',
    targetId: 'idCurso'
})

Curso.hasOne(Cita, {
    foreignKey: 'idCurso',
    targetId: 'idCurso'
})


Persona.hasMany(Cita, {
    foreignKey: 'idPersonaAlumno',
    targetId: 'idPersona'
})

Persona.hasMany(Cita, {
    foreignKey: 'idPersonaDocente',
    targetId: 'idPersona'
})





export default Cita;