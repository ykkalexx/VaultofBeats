import express from "express";
import { AuthControllers } from "../controllers/AuthControllers.js";
import { limiter } from "../middleware/rateLimit.js";
import { PMControllers} from "../controllers/ProjectManagementControllers.js";

const router = express.Router();
const auth = new AuthControllers();
const pm = new PMControllers();
// auth routes

router.post("/register", auth.register);
router.post("/login", limiter, auth.login);

// project management routers
router.post("/upload-project", limiter, pm.createNewProject);
router.post("/upload-file/:{projectId}", limiter, pm.uploadFileToProject);

export default router;
