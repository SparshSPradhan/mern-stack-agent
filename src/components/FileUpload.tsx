import React, { useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { useStore } from "../store/agentTaskUploadStore";
import { Button, Input, Typography } from "@mui/material";

const FileUpload = () => {
    const { token, isLoggedIn } = useAuth();
  const { uploadFile } = useStore();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      await uploadFile(file, token!);
      alert("File uploaded and tasks distributed!");
    }
  };

  return (
    <div>
      <Typography variant="h6">Upload CSV:</Typography>
      <Input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file && !isLoggedIn}>
        Upload
      </Button>
    </div>
  );
};

export default FileUpload;
