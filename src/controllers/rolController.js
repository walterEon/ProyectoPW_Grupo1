import RolesRepository from "../repository/rolRepository.js";

const findAll = async (req, res) => {
    const result = await RolesRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.idRol;
    const result = await RolesRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const result = await RolesRepository.create(req.body);

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await RolesRepository.update(req.body)

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.idRol;

    const result = await RolesRepository.remove(id)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const RolController = { findAll, create, findOne, update, remove }

export default RolController;