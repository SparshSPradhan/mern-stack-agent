import { Request, Response } from "express";
import multer from "multer";
import xlsx from "xlsx";
import fs from "fs";
import Agent from "../../models/Agent";
import Task from "../../models/Task";

const upload = multer({ dest: "uploads/" });

// Upload & Distribute Tasks
const uploadAndDistributeTask = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const agents = await Agent.find();
    if (agents.length === 0) {
      res.status(400).json({ message: "No agents available" });
      return;
    }

    const tasks = data.map((item: any, index: number) => ({
      firstName: item.FirstName,
      phone: item.Phone,
      notes: item.Notes,
      assignedTo: agents[index % agents.length]._id,
    }));

    await Task.insertMany(tasks);
    fs.unlinkSync(filePath);

    res.status(201).json({ message: "Tasks distributed successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default uploadAndDistributeTask;
