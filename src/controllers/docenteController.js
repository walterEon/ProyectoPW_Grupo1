import DocentesRepository from "../repository/docenteRepository.js";

const findAll = async (req, res) => {
    const result = await DocentesRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await DocentesRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {
    
    const result = await DocentesRepository.create(req.body);

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await DocentesRepository.update(req.body)

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await DocentesRepository.remove(id)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const DocenteController = { findAll, create, findOne, update, remove }

export default DocenteController;