import express from "express";
import { AuthControllers } from "../controllers/AuthControllers.js";
import { PMControllers} from "../controllers/ProjectManagementControllers.js";

const router = express.Router();
const auth = new AuthControllers();
const pm = new PMControllers();
// auth routes

router.post("/register", auth.register);
router.post("/login", auth.login);

// project management routers
router.post("/upload-project", pm.createNewProject);
router.post("/upload-file/:projectId", pm.uploadFileToProject);
router.get("/fetch-projects/:user_id", pm.getAllProjects);
router.get("/fetch-project/:user_id/:project_id", pm.getSingleProject);

export default router;
