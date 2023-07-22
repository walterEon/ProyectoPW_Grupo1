import Horario from "../models/horario.js";
import Persona from "../models/persona.js";

const findAll = async () => {
    try {
        const result = await Horario.findAll({include: Persona});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const create = async (horario) => {
    try {

        const newhorario = await Horario.create(horario);

        return newhorario;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const findOne = async (idHorario) => {
    try {
        return await Horario.findOne({
            where: {
                idHorario
            }
        })
    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const update = async (horario) => {
    try {
        const foundHorario =  await Horario.findOne({
            where: {
                idHorario: horario.idHorario
            }
        })

        foundHorario.set(horario)

        foundHorario.save()

        return foundHorario;

    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const remove = async (idHorario) => {
    try {
        await Horario.destroy({
            where: {
                idHorario
            }
        })

        return true;
    }
    catch(err) {
        console.error(err)
        return null;
    }        

}


const HorariosRepository = { findAll, create, findOne,update, remove };

export default HorariosRepository; 