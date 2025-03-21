import express from "express";
import checkBearerToken from '../middlewares/check-bearer-token'
import getTasksByAgent from "../controllers/task/get-task-by-agent-id";

const router = express.Router();

router.get("/:agentId", [checkBearerToken], getTasksByAgent);

export default router;
