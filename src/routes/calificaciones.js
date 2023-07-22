import express from 'express'
import CalificacionController from '../controllers/calificacionController.js'

const { findAll, create, update, remove, findOne } = CalificacionController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:idCalificacion", remove)
router.get("/:idCalificacion", findOne)

export default router;