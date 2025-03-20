import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useStore } from "../store/agentTaskUploadStore";
import { TextField, Button, Box, Typography } from "@mui/material";

interface AddAgentProps {
    onSuccess?: () => void;
}

const AddAgent: React.FC<AddAgentProps> = ({ onSuccess }) => {
  const { addAgent } = useStore();
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please enter all fields");
      return;
    }

    try {
      await addAgent(name, email, mobileNumber,password, token!);
      setName("");
      setEmail("");
      setPassword("");
      setMobileNumber("");
      alert("Agent added successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error adding agent:", error);
      alert("Failed to add agent.");
    }
  };

  return (
    <Box>
      <Typography variant="h6">Add New Agent</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          type="phone"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Agent
        </Button>
      </form>
    </Box>
  );
};

export default AddAgent;

