import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ConfirmDialog = ({ message, onConfirm, setOpen, ...props }) => {
  const { t } = useTranslation();
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  const handleClose = () => {
	setOpen(false);
  };

  return (
    <Dialog {...props} onClose={handleClose}>
      <DialogTitle>{t('confirmAction')}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>{t('cancel')}</Button>
        <Button variant="contained" onClick={handleConfirm} color="error">{t('confirm')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
