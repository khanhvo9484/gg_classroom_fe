import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

interface Props {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 2,
};

const NotifyModalComponent: React.FC<Props> = ({
  isOpen,
  title,
  content,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {content}
          </Typography>
          <Box sx={{ float: "inline-end" }}>
            <Button
              size="medium"
              variant="text"
              onClick={() => {
                onClose();
              }}
            >
              OK
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NotifyModalComponent;
