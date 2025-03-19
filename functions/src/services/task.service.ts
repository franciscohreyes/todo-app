import {TaskRepository} from "../repositories/task.repository";
import {Task} from "../models/task.model";

/**
 * Servicio para manejar la lógica de negocio de tareas.
 */
export class TaskService {
  private taskRepository: TaskRepository;

  /**
   * constructor
   */
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  /**
   * Encuentra todas las tareas.
   * @return {Promise<Task[]>} Lista de tareas.
   */
  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  /**
   * Crea una nueva tarea.
   * @param {Task} task - Tarea a crear.
   * @return {Promise<Task>} Tarea creada.
   */
  async createTask(task: Task): Promise<Task> {
    return await this.taskRepository.create(task);
  }

  /**
   * Actualiza una tarea existente.
   * @param {string} id - ID de la tarea a actualizar.
   * @param {Partial<Task>} updatedData - Datos actualizados.
   * @return {Promise<void>} No devuelve nada.
   */
  async updateTask(id: string, updatedData: Partial<Task>): Promise<void> {
    await this.taskRepository.update(id, updatedData);
  }

  /**
   * Elimina una tarea existente.
   * @param {string} id - ID de la tarea a eliminar.
   * @return {Promise<void>} No devuelve nada.
   */
  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
