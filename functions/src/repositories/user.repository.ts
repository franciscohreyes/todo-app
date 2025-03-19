
import {User} from "../models/user.model";
import {db} from "../config/firestore";

/**
 * UserRepository
 */
export class UserRepository {
  private collection = db.collection("users");

  /**
   * Encuentra todos los usuarios.
   * @return {Promise<User[]>} Lista de usuarios.
   */
  async findAll(): Promise<User[]> {
    const snapshot = await this.collection
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()} as User));
  }

  /**
   * Busca un usuario por su dirección de email
   * @param {string} email - La dirección de correo electrónico
   * @return {Promise<User | null>} El usuario encontrado o null
   */
  async findUserByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection
      .where("email", "==", email)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {id: doc.id, ...doc.data()} as User;
  }

  /**
   * Crea un nuevo usuario en la colección de usuarios.
   * @param {User} user - Usuario a crear
   * @return {Promise<User>} El usuario creado.
   */
  async createUser(user: User): Promise<User> {
    try {
      const newUserRef = this.collection.doc();
      await newUserRef.set({...user, createdAt: new Date()});
      return {id: newUserRef.id, ...user};
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  /**
   * Elimina un usuario existente.
   * @param {string} id - ID del usuario a eliminar.
   * @return {Promise<void>} No devuelve nada.
   */
  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
