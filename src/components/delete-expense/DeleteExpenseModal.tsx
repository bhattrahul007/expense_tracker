import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '../modal';
import React from 'react';

interface DeleteExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteExpenseModal: React.FC<DeleteExpenseModalProps> = ({ open, onClose, onDelete }) => (
  <Modal
    open={open}
    title="Confirm Delete"
    onClose={onClose}
    actions={
      <>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onDelete}>
          Delete
        </Button>
      </>
    }
  >
    <Typography>Are you sure you want to delete this expense?</Typography>
  </Modal>
);

export default DeleteExpenseModal;
