import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validationMiddleware.js";
import { authLimiter } from "../utils/rateLimitter.js";

const router = Router();

router.post("/login", authLimiter, validateLogin, login);
router.post("/register", authLimiter, validateRegister, register);

export default router;
