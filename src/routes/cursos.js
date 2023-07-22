import express from 'express'
import CursoController from '../controllers/cursoController.js'

const { findAll, create, update, remove, findOne } = CursoController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:idCurso", remove)
router.get("/:idCurso", findOne)

export default router;