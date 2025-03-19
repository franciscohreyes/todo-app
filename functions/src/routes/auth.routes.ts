import {Router} from "express";
import {AuthController} from "../controllers/auth.controller";

const router = Router();

// Instancia AuthController
const authController = new AuthController();

/**
 * Ruta de usuarios
 */
router.post("/users", authController.registerUser);
router.post("/login", authController.login);
router.get("/check/:email", authController.checkUser);
router.get("/users", authController.getUsers);
router.delete("/users/:id", authController.deleteUser);

export default router;
