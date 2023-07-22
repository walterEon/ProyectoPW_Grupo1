import Calificacion from "../models/calificacion.js";
import Cita from "../models/cita.js";

const findAll = async () => {
    try {
        const result = await Calificacion.findAll({include: Cita});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const create = async (calificacion) => {
    try {

        const newcalificacion = await Calificacion.create(calificacion);

        return newcalificacion;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const findOne = async (idCalificacion) => {
    try {
        return await Calificacion.findOne({
            where: {
                idCalificacion
            }
        })
    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const update = async (calificacion) => {
    try {
        const foundCalificacion =  await Calificacion.findOne({
            where: {
                idCalificacion: calificacion.idCalificacion
            }
        })

        foundCalificacion.set(cita)

        foundCalificacion.save()

        return foundCalificacion;

    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const remove = async (idCalificacion) => {
    try {
        await Calificacion.destroy({
            where: {
                idCalificacion
            }
        })

        return true;
    }
    catch(err) {
        console.error(err)
        return null;
    }        

}


const CalificacionesRepository = { findAll, create, findOne,update, remove };

export default CalificacionesRepository; 