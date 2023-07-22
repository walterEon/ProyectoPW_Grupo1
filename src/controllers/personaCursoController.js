import PersonasCursosRepository from "../repository/personaCursoRepository.js";

const findAll = async (req, res) => {
    const result = await PersonasCursosRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.idPersonaCurso;
    const result = await PersonasCursosRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const result = await PersonasCursosRepository.create(req.body);

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await PersonasCursosRepository.update(req.body)

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.idPersonaCurso;

    const result = await PersonasCursosRepository.remove(id)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const PersonaCursoController = { findAll, create, findOne, update, remove }

export default PersonaCursoController;