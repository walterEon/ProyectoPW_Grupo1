import Universidad from "../models/universidad.js";
import Carrera from "../models/carrera.js";
import Persona from "../models/persona.js";
import Curso from "../models/curso.js";

const findAll = async () => {
    try {

        const result = await Carrera.findAll({include: Universidad});
        console.debug(result)

        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const create = async (carrera) => {
    try {

        const newcarrera = await Carrera.create(carrera);

        return newcarrera;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const findOne = async (idCarrera) => {
    try {
        return await Carrera.findOne({
            where: {
                idCarrera
            }
        })
    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const update = async (carrera) => {
    try {
        const foundcarrera =  await Carrera.findOne({
            where: {
                idCarrera: carrera.idCarrera
            }
        })

        foundcarrera.set(carrera)

        foundcarrera.save()

        return foundcarrera;

    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const remove = async (idCarrera) => {
    try {
        await Carrera.destroy({
            where: {
                idCarrera
            }
        })

        return true;
    }
    catch(err) {
        console.error(err)
        return null;
    }        

}


const CarrerasRepository = { findAll, create, findOne,update, remove };

export default CarrerasRepository; 
