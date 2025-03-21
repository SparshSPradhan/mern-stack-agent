import { Request, Response } from "express";
import Agent from "../../models/Agent";
import bcrypt from "bcrypt";

// Add Agent
const addAgent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, mobileNumber, password } = req.body;
    
    if (!name || !email || !mobileNumber || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      res.status(400).json({ message: "Agent already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgent = new Agent({ name, email, mobileNumber, password: hashedPassword });
    await newAgent.save();

    res.status(201).json({ message: "Agent created successfully", agent: newAgent });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default addAgent;
