import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useModalStore } from '@/app/store/useModalStore'; // adjust path as needed

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:'40px'
};

const closeButtonStyle = {
  position: 'absolute',
  top: 8,
  right: 8,
  color: 'red',
  zIndex: 1,
};

export default function MyModal() {
  const { isOpen, component: Component, closeModal } = useModalStore();

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
       {/* <IconButton aria-label="close" onClick={closeModal} sx={closeButtonStyle}>
          <CloseIcon />
        </IconButton>*/}
        {Component && <Component />}
      </Box>
    </Modal>
  );
}