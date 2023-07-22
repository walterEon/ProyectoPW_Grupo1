import Horario from "../models/horario.js";
import Cita from "../models/cita.js";
import PersonaCurso from "../models/personaCurso.js";
import Rol from "../models/rol.js";
import Carrera from "../models/carrera.js";
import Persona from "../models/persona.js";
import Universidad from "../models/universidad.js";


const findAll = async () => {
    try {
        const result = await Persona.findAll({include: [Cita, Rol, Carrera, PersonaCurso, Horario]});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const create = async (persona) => {
    try {

        const newpersona = await Persona.create(persona);

        return newpersona;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const findOne = async (idPersona) => {
    try {
        return await Persona.findOne({
            where: {
                idPersona
            }
        })
    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const update = async (persona) => {
    try {
        const foundPersona =  await Persona.findOne({
            where: {
                idPersona: persona.idPersona
            }
        })

        foundPersona.set(persona)

        foundPersona.save()

        return foundPersona;

    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const remove = async (idPersona) => {
    try {
        await Persona.destroy({
            where: {
                idPersona
            }
        })

        return true;
    }
    catch(err) {
        console.error(err)
        return null;
    }        

}


const PersonasRepository = { findAll, create, findOne,update, remove };

export default PersonasRepository; 
