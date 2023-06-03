import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ConfirmDialog = ({ message, onConfirm, setOpen, ...props }) => {
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  const handleClose = () => {
	setOpen(false);
  };

  return (
    <Dialog {...props} onClose={handleClose}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm} color="error">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
