import express from 'express'
import PersonaController from '../controllers/personaController.js'

const { findAll, create, update, remove, findOne } = PersonaController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:idPersona", remove)
router.get("/:idPersona", findOne)

export default router;