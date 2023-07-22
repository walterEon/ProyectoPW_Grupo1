import Curso from '../models/curso.js'
import Carrera from '../models/carrera.js';
import PersonaCurso from '../models/personaCurso.js';
import Cita from '../models/cita.js';

const findAll = async () => {
    try {
        const result = await Curso.findAll({include: Carrera});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const create = async (curso) => {
    try {

        const newCurso = await Curso.create(curso);

        return newCurso;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const findOne = async (idCurso) => {
    try {
        return await Curso.findOne({
            where: {
                idCurso
            }
        })
    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const update = async (curso) => {
    try {
        const foundCurso =  await Curso.findOne({
            where: {
                idCurso: curso.idCurso
            }
        })

        foundCurso.set(curso)

        foundCurso.save()

        return foundCurso;

    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const remove = async (idCurso) => {
    try {
        await Curso.destroy({
            where: {
                idCurso
            }
        })

        return true;
    }
    catch(err) {
        console.error(err)
        return null;
    }        

}


const CursosRepository = { findAll, create, findOne,update, remove };

export default CursosRepository; 
