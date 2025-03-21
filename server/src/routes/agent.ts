import express from "express";
import checkBearerToken from '../middlewares/check-bearer-token'
import addAgent from "../controllers/agent/add-agent";
import getAllAgents from "../controllers/agent/get-all-agents";


const router = express.Router();

// POST at route: http://localhost:8080/agent/register
router.post("/register", [checkBearerToken], addAgent);

// GET at route: http://localhost:8080/agent
router.get("/all", [checkBearerToken], getAllAgents);

export default router;
