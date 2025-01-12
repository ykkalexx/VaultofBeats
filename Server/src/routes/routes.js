import express from "express";
import { AuthControllers } from "../controllers/AuthControllers";
import { limiter } from "../middleware/rateLimit";

const router = express.Router();
const auth = new AuthControllers();

router.post("/register", auth.register);
router.post("/login", limiter, auth.login);

export default router;
