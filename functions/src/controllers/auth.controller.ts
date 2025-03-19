import {Request, Response} from "express";
import {AuthService} from "../services/auth.service";

/**
 * Controlador para manejar las operaciones de usuario.
 */
export class AuthController {
  private authService: AuthService;

  /**
   * AuthService
   */
  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Verifica si un usuario existe y lo registra si no.
   * @param {Request} req - La solicitud HTTP.
   * @param {Response} res - La respuesta HTTP.
   * @return {Promise<Response>} La respuesta HTTP con el usuario creado
   */
  registerUser = async (req: Request, res: Response) => {
    try {
      const {email} = req.body;

      // Validar que el email esté presente
      if (!email || typeof email !== "string") {
        return res.status(400).json({message: "El email es requerido"});
      }

      // Verificar si el usuario ya existe
      const existingUser = await this.authService.checkUserExists(email);
      if (existingUser) {
        return res.status(400).json({message: "El usuario ya existe"});
      }

      // Crear un nuevo usuario
      const newUserData = {
        email,
        createdAt: new Date(),
      };

      const newUser = await this.authService.createUser(newUserData);
      return res.status(201).json({success: true, user: newUser});
    } catch (error) {
      return res.status(500).json({message: "Error en el servidor", error});
    }
  };

  /**
   * Maneja el inicio de sesión de un usuario.
   * @param {Request} req - La solicitud HTTP.
   * @param {Response} res - La respuesta HTTP.
   * @return {Promise<Response>} La respuesta HTTP con el usuario
   */
  login = async (req: Request, res: Response) => {
    try {
      const _bodyRequest = req.body;
      console.log("_bodyRequest ", _bodyRequest.email);

      if (!_bodyRequest.email || typeof _bodyRequest.email !== "string") {
        return res.status(400).json({message: "El email es requerido"});
      }

      // Verificar si el usuario ya existe
      const existingUser =
        await this.authService.checkUserExists(_bodyRequest.email);

      if (existingUser) {
        return res.status(200).json({user: existingUser});
      }

      const email = _bodyRequest.email;

      // Si no existe, crear el usuario
      const newUserData = {
        email,
        createdAt: new Date(),
      };
      const newUser = await this.authService.createUser(newUserData);
      return res.status(201).json({success: true, user: newUser});
    } catch (error) {
      return res.status(500).json({message: "Error en el servidor", error});
    }
  };

  /**
   * Maneja el inicio de sesión de un usuario.
   * @param {Request} req - La solicitud HTTP.
   * @param {Response} res - La respuesta HTTP.
   * @return {Promise<Response>} La respuesta HTTP con el usuario
   */
  checkUser = async (req: Request, res: Response) => {
    const {email} = req.params;
    console.log(`Verificando si el usuario ${email} existe...`);

    if (!email) {
      return res.status(400).json({error: "El correo es requerido"});
    }

    const exists = await this.authService.checkUserExists(email);
    return res.status(200).json({exists});
  };

  /**
   * Maneja la obtención de todas los usuarios.
   * @param {Request} req - La solicitud HTTP.
   * @param {Response} res - La respuesta HTTP.
   * @return {Promise<Response>} La respuesta HTTP con la tarea creada.
   */
  getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.authService.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({message: "Error en el servidor", error});
    }
  };

  /**
   * Maneja la eliminación de un usuario existente.
   * @param {Request} req - La solicitud HTTP.
   * @param {Response} res - La respuesta HTTP.
   * @return {Promise<Response>} La respuesta HTTP sin contenido.
   */
  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {id} = req.params;
      await this.authService.deleteById(id);
      return res.status(204).send(); // No content
    } catch (error) {
      return res.status(500).json({message: "Error en el servidor", error});
    }
  };
}
