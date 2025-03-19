import {Request, Response} from "express";
import {TaskService} from "../services/task.service";

/**
 * Controlador para manejar las operaciones de tareas.
 */
export class TaskController {
  private taskService: TaskService;

  /**
   * TaskService
   */
  constructor() {
    this.taskService = new TaskService();
  }

  /**
   * Maneja la obtención de todas las tareas.
   * @param {Request} req - La solicitud HTTP.
   * @param {Response} res - La respuesta HTTP.
   * @return {Promise<Response>} La respuesta HTTP con la tarea creada.
   */
  getAllTasks = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tasks = await this.taskService.getAllTasks();
      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({message: "Error en el servidor", error});
    }
  };

  /**
   * Maneja la creación de una nueva tarea.
   * @param {Request} req - La solicitud HTTP.
   * @param {Response} res - La respuesta HTTP.
   * @return {Promise<Response>} La respuesta HTTP con la tarea creada.
   */
  createTask = async (req: Request, res: Response) => {
    try {
      const task = req.body;
      const newTask = await this.taskService.createTask(task);
      return res.status(201).json(newTask);
    } catch (error) {
      return res.status(500).json({message: "Error en el servidor", error});
    }
  };

  /**
   * Maneja la actualización de una tarea existente.
   * @param {Request} req - La solicitud HTTP.
   * @param {Response} res - La respuesta HTTP.
   * @return {Promise<Response>} La respuesta HTTP con la tarea actualizada.
   */
  updateTask = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {id} = req.params;
      const updatedData = req.body;
      await this.taskService.updateTask(id, updatedData);
      return res.status(204).send(); // No content
    } catch (error) {
      return res.status(500).json({message: "Error en el servidor", error});
    }
  };

  /**
   * Maneja la eliminación de una tarea existente.
   * @param {Request} req - La solicitud HTTP.
   * @param {Response} res - La respuesta HTTP.
   * @return {Promise<Response>} La respuesta HTTP sin contenido.
   */
  deleteTask = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {id} = req.params;
      await this.taskService.deleteTask(id);
      return res.status(204).send(); // No content
    } catch (error) {
      return res.status(500).json({message: "Error en el servidor", error});
    }
  };
}
