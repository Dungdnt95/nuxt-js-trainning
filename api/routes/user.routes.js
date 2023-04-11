import { signupValidation, loginValidation } from "../controllers/verify.js";
import { users } from "../controllers/user.controller.js";
import express from "express";
const router = express.Router();

router.post("/register", signupValidation, users.create);
router.get("/login", loginValidation, users.findUser);

export default router;
