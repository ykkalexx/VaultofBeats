import express from "express";
import { AuthControllers } from "../controllers/AuthControllers.js";
import { limiter } from "../middleware/rateLimit.js";

const router = express.Router();
const auth = new AuthControllers();

router.post("/register", auth.register);
router.post("/login", limiter, auth.login);

export default router;
