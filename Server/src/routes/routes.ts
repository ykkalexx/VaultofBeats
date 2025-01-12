import express from "express";
import { AuthControllers } from "../controllers/AuthControllers";

const router = express.Router();
const auth = new AuthControllers();

router.post("/register", auth.register);
router.post("/login", auth.login);

export default router;
