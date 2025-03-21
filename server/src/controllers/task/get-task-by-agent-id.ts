import { Request, Response } from "express";
import Task from "../../models/Task";
import mongoose from "mongoose";

// Get all tasks
const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    // const tasks = await Task.find().populate("assignedTo");
    const agentId = req.params.agentId;
    const tasks = await Task.find({ assignedTo: new mongoose.Types.ObjectId(agentId) })
      .populate("assignedTo");
   
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default getTasks;
