import Curso from "../models/curso.js";
import Cita from "../models/cita.js";
import Persona from "../models/persona.js";

const findAll = async () => {
    try {
        const result = await Cita.findAll({include: Persona});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const create = async (cita) => {
    try {

        const newcita = await Cita.create(cita);

        return newcita;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const findOne = async (idCita) => {
    try {
        return await Cita.findOne({
            where: {
                idCita
            }
        })
    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const update = async (cita) => {
    try {
        const foundCita =  await Cita.findOne({
            where: {
                idCita: cita.idCita
            }
        })

        foundCita.set(cita)

        foundCita.save()

        return foundCita;

    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const remove = async (idCita) => {
    try {
        await Cita.destroy({
            where: {
                idCita
            }
        })

        return true;
    }
    catch(err) {
        console.error(err)
        return null;
    }        

}


const CitasRepository = { findAll, create, findOne,update, remove };

export default CitasRepository; 