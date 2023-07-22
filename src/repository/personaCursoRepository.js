import Persona from "../models/persona.js";
import Curso from "../models/curso.js";
import PersonaCurso from "../models/personaCurso.js";

const findAll = async () => {
    try {
        const result = await PersonaCurso.findAll();
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const create = async (personaCurso) => {
    try {

        const newpersonacurso = await PersonaCurso.create(personaCurso);

        return newpersonacurso;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const findOne = async (idPersonaCurso) => {
    try {
        return await PersonaCurso.findOne({
            where: {
                idPersonaCurso
            }
        })
    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const update = async (personaCurso) => {
    try {
        const foundPersonaCurso =  await PersonaCurso.findOne({
            where: {
                idPersonaCurso: personaCurso.idPersonaCurso
            }
        })

        foundPersonaCurso.set(personaCurso)

        foundPersonaCurso.save()

        return foundPersonaCurso;

    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const remove = async (idPersonaCurso) => {
    try {
        await PersonaCurso.destroy({
            where: {
                idPersonaCurso
            }
        })

        return true;
    }
    catch(err) {
        console.error(err)
        return null;
    }        

}


const PersonasCursosRepository = { findAll, create, findOne,update, remove };

export default PersonasCursosRepository; 
