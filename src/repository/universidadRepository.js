import Universidad from "../models/universidad.js";
import Carrera from "../models/carrera.js";

const findAll = async () => {
    try {

        const result = await Universidad.findAll();
        console.debug(result)

        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const create = async (universidad) => {
    try {

        const newuniversidad = await Universidad.create(universidad);

        return newuniversidad;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const findOne = async (idUniversidad) => {
    try {
        return await Universidad.findOne({
            where: {
                idUniversidad
            }
        })
    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const update = async (universidad) => {
    try {
        const founduniversidad =  await Universidad.findOne({
            where: {
                idUniversidad: universidad.idUniversidad
            }
        })

        founduniversidad.set(universidad)

        founduniversidad.save()

        return founduniversidad;

    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const remove = async (idUniversidad) => {
    try {
        await Universidad.destroy({
            where: {
                idUniversidad
            }
        })

        return true;
    }
    catch(err) {
        console.error(err)
        return null;
    }        

}


const UniversidadesRepository = { findAll, create, findOne,update, remove };

export default UniversidadesRepository; 
