
import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Carrera from "./carrera.js"

const Curso = sequelize.define('cursos', {
    idCurso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING
    },
    idCarrera: {
        type: DataTypes.INTEGER
    }
})

Curso.belongsTo(Carrera, {
    foreignKey: 'idCarrera',
    targetId: 'idCarrera'
})

Carrera.hasMany(Curso, {
    foreignKey: 'idCarrera',
    targetId: 'idCarrera'
})


export default Curso;