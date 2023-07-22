
import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Rol from "./rol.js"
import Carrera from "./carrera.js"

const Persona = sequelize.define('personas', {
    idPersona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    tipoDocumento: {
        type: DataTypes.STRING
    },
    DNI: {
        type: DataTypes.STRING
    },
    idRol: {
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    idCarrera: {
        type: DataTypes.INTEGER
    },
    tituloPresentacion: {
        type: DataTypes.STRING
    },
    presentacion: {
        type: DataTypes.STRING
    },
    grado: {
        type: DataTypes.STRING
    }
})

Persona.belongsTo(Rol, {
    foreignKey: 'idRol',
    targetId: 'idRol'
})

Persona.belongsTo(Carrera, {
    foreignKey: 'idCarrera',
    targetId: 'idCarrera'
})

Rol.hasOne(Persona, {
    foreignKey: 'idRol',
    targetId: 'idRol'
})

Carrera.hasMany(Persona, {
    foreignKey: 'idCarrera',
    targetId: 'idCarrera'
})


export default Persona;