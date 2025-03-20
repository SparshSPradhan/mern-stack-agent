import { create } from "zustand";
import axios from "../utils/axios";

interface Agent {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
}

interface Task {
  _id: string;
  firstName: string;
  phone: string;
  notes: string;
  assignedTo: string;
}

interface StoreState {
  agents: Agent[];
  tasks: Task[];
  fetchAgents: (token: string) => Promise<void>;
  fetchTasks: (agentId: string, token: string) => Promise<void>;
  uploadFile: (file: File, token: string) => Promise<void>;
  addAgent: (name: string, email: string, mobileNumber: string, password: string,token: string) => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  agents: [],
  tasks: [],
  fetchAgents: async (token) => {
    if (!token) return;  // ✅ Prevent API call if not logged in

    try {
      const { data } = await axios.get("/agent/all", {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
      });
      set({ agents: data });
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  },
  fetchTasks: async (agentId, token) => {
    if (!token) return;

    try {
      const { data } = await axios.get(`/task/${agentId}`, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
         },
      });
      set({ tasks: data });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  },
  uploadFile: async (file, token) => {
    if (!token) return;
    try {
        const formData = new FormData();
        formData.append("file", file);
        await axios.post("/upload", formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
             },
        });
    } catch (error) {
        console.error("Error uploading task files:", error);
    }
  },
  addAgent: async (name, email, mobileNumber,password, token) => {
    try {
      const response = await axios.post(
        "/agent/register",
        { name, email, mobileNumber, password},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({ agents: [...state.agents, response.data] }));
    } catch (error) {
      console.error("Error adding agent:", error);
    }
  },
}));

