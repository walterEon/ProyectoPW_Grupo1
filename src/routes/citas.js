import express from 'express'
import CitaController from '../controllers/citaController.js'

const { findAll, create, update, remove, findOne } = CitaController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:idCita", remove)
router.get("/:idCita", findOne)

export default router;