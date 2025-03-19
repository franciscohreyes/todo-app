import {UserRepository} from "../repositories/user.repository";
import {User} from "../models/user.model";

/**
 * Servicio de autenticación para manejar las operaciones
 */
export class AuthService {
  private userRepository = new UserRepository();

  /**
   * Verifica si un usuario existe en la base de datos.
   * @param {string} email - La dirección email del usuario.
   * @return {Promise<boolean>} Devuelve true o false.
   */
  async checkUserExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findUserByEmail(email);
    return !!user;
  }

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param {User} user - Usuario a crear.
   * @return {Promise<User>} Usuario creado.
   */
  async createUser(user: User): Promise<User> {
    return await this.userRepository.createUser(user);
  }

  /**
   * Encuentra todas los usuarios.
   * @return {Promise<User[]>} Lista de usuarios.
   */
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  /**
   * Elimina un usuario existente.
   * @param {string} id - ID del usuario a eliminar.
   * @return {Promise<void>} No devuelve nada.
   */
  async deleteById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
