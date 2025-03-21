import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  firstName: string;
  phone: string;
  notes?: string;
  assignedTo: mongoose.Types.ObjectId;
  createdAt: Date;
}

const taskSchema = new Schema<ITask>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
