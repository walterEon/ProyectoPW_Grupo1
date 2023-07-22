import Rol from '../models/rol.js';
import Persona from '../models/persona.js';

const findAll = async () => {
    try {

        const result = await Rol.findAll();
        console.debug(result)

        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const create = async (rol) => {
    try {

        const newrol = await Rol.create(rol);

        return newrol;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const findOne = async (idRol) => {
    try {
        return await Rol.findOne({
            where: {
                idRol
            }
        })
    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const update = async (rol) => {
    try {
        const foundrol =  await Rol.findOne({
            where: {
                idRol: rol.idRol
            }
        })

        foundrol.set(rol)

        foundrol.save()

        return foundrol;

    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const remove = async (idRol) => {
    try {
        await Rol.destroy({
            where: {
                idRol
            }
        })

        return true;
    }
    catch(err) {
        console.error(err)
        return null;
    }        

}


const RolesRepository = { findAll, create, findOne,update, remove };

export default RolesRepository; 
