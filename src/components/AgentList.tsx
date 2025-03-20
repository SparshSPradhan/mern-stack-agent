import React, { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { useStore } from "../store/agentTaskUploadStore";
import { Select, MenuItem, Typography, Box, SelectChangeEvent, Button } from "@mui/material";
import AddAgentModal from "./AddAgentModal";
import FileUpload from "./FileUpload";

const AgentList = () => {
        const { token, isLoggedIn } = useAuth();
  const { agents, fetchAgents, fetchTasks, tasks } = useStore();
  const [selectedAgent, setSelectedAgent] = useState("");
  const [isAddAgentModalOpen, setIsAddAgentModalOpen] = useState(false);

  useEffect(() => {
    if(isLoggedIn) {
        fetchAgents(token!);
    }
  }, [fetchAgents, isLoggedIn]);

const handleAgentChange = (event: SelectChangeEvent<string>) => {
    const agentId = event.target.value;
    setSelectedAgent(agentId);
    fetchTasks(agentId, token!);
};

  return (
    <Box>
      <Typography variant="h6">Select Agent:</Typography>
      <Select value={selectedAgent} onChange={handleAgentChange} fullWidth>
        {agents.map((agent) => (
          <MenuItem key={agent._id} value={agent._id}>
            {agent.name}
          </MenuItem>
        ))}
      </Select>

      {/* Button to open modal */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setIsAddAgentModalOpen(true)}
        sx={{ mb: 2 }}
      >
        Add Agent
      </Button>
      <AddAgentModal open={isAddAgentModalOpen} onClose={() => setIsAddAgentModalOpen(false)} />

    <FileUpload />

      {selectedAgent && (
        <Box mt={2}>
          <Typography variant="h6">Tasks for {selectedAgent}:</Typography>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Typography key={task._id}>
                {task.firstName} - {task.phone} - {task.notes}
              </Typography>
            ))
          ) : (
            <Typography>No tasks assigned.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AgentList;
