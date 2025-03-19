import {db} from "../config/firestore";
import {Task} from "../models/task.model";

/**
 * Repositorio para manejar las operaciones de tareas en Firestore.
 */
export class TaskRepository {
  private collection = db.collection("tasks");

  /**
   * Encuentra todas las tareas.
   * @return {Promise<Task[]>} Lista de tareas.
   */
  async findAll(): Promise<Task[]> {
    const snapshot = await this.collection
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()} as Task));
  }

  /**
   * Crea una nueva tarea.
   * @param {Task} task - Tarea a crear.
   * @return {Promise<Task>} Tarea creada.
   */
  async create(task: Task): Promise<Task> {
    try {
      const newTaskRef = this.collection.doc();
      await newTaskRef.set({...task, createdAt: new Date()});
      return {id: newTaskRef.id, ...task};
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  /**
   * Actualiza una tarea existente.
   * @param {string} id - ID de la tarea a actualizar.
   * @param {Partial<Task>} updatedData - Datos actualizados.
   * @return {Promise<void>} No devuelve nada.
   */
  async update(id: string, updatedData: Partial<Task>): Promise<void> {
    await this.collection.doc(id).update(updatedData);
  }

  /**
   * Elimina una tarea existente.
   * @param {string} id - ID de la tarea a eliminar.
   * @return {Promise<void>} No devuelve nada.
   */
  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
