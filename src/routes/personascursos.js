import express from 'express'
import PersonaCursoController from '../controllers/personaCursoController.js'

const { findAll, create, update, remove, findOne } = PersonaCursoController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:idPersonaCurso", remove)
router.get("/:idPersonaCurso", findOne)

export default router;