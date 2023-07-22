import express from 'express'
import HorarioController from '../controllers/horarioController.js'

const { findAll, create, update, remove, findOne } = HorarioController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:idHorario", remove)
router.get("/:idHorario", findOne)

export default router;