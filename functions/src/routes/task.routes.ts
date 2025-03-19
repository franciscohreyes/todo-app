import {Router} from "express";
import {TaskController} from "../controllers/task.controller";

const router = Router();

// Instancia TaskController
const taskController = new TaskController();

/**
 * Rutas de tareas.
 */
router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
