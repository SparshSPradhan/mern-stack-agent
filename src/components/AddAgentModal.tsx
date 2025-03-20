import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import AddAgent from "./AddAgent";

interface AddAgentModalProps {
  open: boolean;
  onClose: () => void;
}

const AddAgentModal: React.FC<AddAgentModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Agent</DialogTitle>
      <DialogContent>
        <AddAgent onSuccess={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAgentModal;
