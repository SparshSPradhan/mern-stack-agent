import { Request, Response } from "express";
import Agent from "../../models/Agent";

// Get all agents
const getAllAgents = async (req: Request, res: Response) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default getAllAgents;
