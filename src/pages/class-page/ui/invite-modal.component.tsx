import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Button from "@mui/material/Button";
import {
  STRING_TITLE_INVITE_STUDENT,
  STRING_TITLE_INVITE_TEACHER,
} from "@/constant/ui/ui.constant";

interface Props {
  isOpenModalInvite: boolean;
  handleCloseModalInvite: () => void;
  handleInviteMember: (email: string) => void;
  isTeacherList: boolean;
  isLoadingInvitation: boolean;
}

const InviteModalComponent: React.FC<Props> = ({
  isOpenModalInvite,
  isLoadingInvitation,
  isTeacherList,
  handleCloseModalInvite,
  handleInviteMember,
}) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const title = isTeacherList
    ? STRING_TITLE_INVITE_TEACHER
    : STRING_TITLE_INVITE_STUDENT;

  const handleClose = () => {
    handleCloseModalInvite();
  };

  const handleInvite = () => {
    setIsEmailValid(emailRegex.test(email));

    if (isEmailValid) {
      handleInviteMember(email);
    }
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={isOpenModalInvite}
        onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Địa chỉ Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => setEmail(event.target.value)}
            error={!isEmailValid}
            helperText={!isEmailValid ? "Địa chỉ Email không hợp lệ" : ""}
          />

          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#5f6368" }} onClick={handleClose}>
            Hủy
          </Button>
          <Button disabled={isLoadingInvitation} onClick={handleInvite}>
            {!isLoadingInvitation ? "Mời" : "Đang mời ..."}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InviteModalComponent;
