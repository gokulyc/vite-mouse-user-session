import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export const IdleTimeOutModal = ({
  handleContinue,
  handleLogout,
  remainingTime,
  open,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleLogout}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
        }}
      >
        <Typography id="modal-modal-title">You Have Been Idle!</Typography>
        <Typography id="modal-modal-description">
          Your session is Timed Out. You want to stay?
        </Typography>
        <Box>
          <Button color="secondary" onClick={handleLogout}>
            Logout
          </Button>
          <Button color="primary" onClick={handleContinue}>
            Continue Session
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
