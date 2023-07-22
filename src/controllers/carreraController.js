import CarrerasRepository from "../repository/carreraRepository.js";

const findAll = async (req, res) => {
    const result = await CarrerasRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.idCarrera;
    const result = await CarrerasRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const result = await CarrerasRepository.create(req.body);

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await CarrerasRepository.update(req.body)

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.idCarrera;

    const result = await CarrerasRepository.remove(id)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const CarreraController = { findAll, create, findOne, update, remove }

export default CarreraController;