import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useModalStore } from "store/useModalStore";

const LoggedOutView = () => {
  const { setCurrentModal } = useModalStore();

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h5">Welcome to Agent Management Admin</Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentModal("LOGIN")}
          sx={{ mr: 2 }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setCurrentModal("REGISTER")}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default LoggedOutView;
