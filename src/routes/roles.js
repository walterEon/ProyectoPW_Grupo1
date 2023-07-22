import express from 'express'
import RolController from '../controllers/rolController.js'

const { findAll, create, update, remove, findOne } = RolController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:idRol", remove)
router.get("/:idRol", findOne)

export default router;