
import express from 'express'
import CarreraController from "../controllers/carreraController.js";

const { findAll, create, update, remove, findOne } = CarreraController

const router = express.Router()

router.get("/", findAll)
router.post("/", create)
router.put("/", update)
router.delete("/:idCarrera", remove)
router.get("/:idCarrera", findOne)

export default router;