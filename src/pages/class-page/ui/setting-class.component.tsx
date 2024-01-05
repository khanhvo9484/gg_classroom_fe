import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { forwardRef, useState } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { Box, CardActions, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import NotifyModalComponent from "@/components/ui/modals/notify-modal.component";
import { sortableContainer, sortableElement } from "react-sortable-hoc";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ScoreTypeComponent from "./score-type.component";
import { arrayMove } from "react-sortable-hoc";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

const SettingClassComponent: React.FC<SimpleDialogProps> = ({
  open,
  onClose,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const user = useSelector(selectUser);
  const [optionScore, setOptionScore] = useState("");

  const [listScoreType, setListScoreType] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
  ]);

  const SortableScoreTypeComponent = sortableElement(ScoreTypeComponent);
  const SortableStack = sortableContainer(({ children }) => (
    <Stack>{children}</Stack>
  ));

  const handleChangeOptionScore = (event: SelectChangeEvent) => {
    setOptionScore(event.target.value);
    console.log("Da change:");
  };

  const handleClose = () => {
    onClose();
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // Implement your logic here
    console.log("old index: ", oldIndex);
    console.log("new index: ", newIndex);
    setListScoreType(arrayMove(listScoreType, oldIndex, newIndex));
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", bgcolor: "white" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ color: "#5f6368" }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 3, flex: 1, color: "#5f6368" }}
              variant="subtitle1"
              component="div"
            >
              Cài đặt lớp học
            </Typography>
            <Button autoFocus variant="contained">
              {!isLoading ? "Lưu" : "Đang lưu..."}
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            // height: "100vh",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              my: "8rem",
              width: "45rem",
              height: "45rem",
              border: "0.0625rem solid #dadce0",
              borderRadius: "0.5rem",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                sx={{ color: "rgb(25,103,210)", mb: 2 }}
              >
                Chấm điểm
              </Typography>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Tính điểm
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                    Tính tổng điểm
                  </Typography>
                  <Typography variant="caption">
                    Chọn một hệ thống chấm điểm
                  </Typography>
                </Box>
                <Box>
                  <FormControl variant="filled" sx={{ m: 1, width: 220 }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Loại{" "}
                    </InputLabel>
                    <Select
                      value={optionScore}
                      onChange={handleChangeOptionScore}
                    >
                      <MenuItem value={0}>Không tính tổng điểm</MenuItem>
                      <MenuItem value={1}>Tổng điểm</MenuItem>
                      <MenuItem value={2}>Trọng số theo danh mục</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </CardContent>
            <Box
              sx={{
                borderBottom: "0.0625rem solid #dbdbdb",
                margin: "0rem -1rem 1rem",
              }}
            />
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Loại điểm
              </Typography>

              <SortableStack onSortEnd={onSortEnd}>
                {listScoreType.map((value, index) => (
                  <SortableScoreTypeComponent
                    key={`item-${value}`}
                    index={index}
                  />
                ))}
              </SortableStack>
            </CardContent>
            <CardActions>
              <Button size="small" sx={{ color: "rgb(25,103,210)" }}>
                <Typography variant="subtitle2" gutterBottom>
                  Thêm loại điểm
                </Typography>
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Dialog>
      <NotifyModalComponent
        isOpen={isError}
        title="Đã xảy ra lỗi"
        content="Không thể tham gia lớp học. Hãy kiểm tra mã và tài khoản rồi thử lại."
        onClose={() => {
          setIsError(false);
        }}
      />
    </>
  );
};

export default SettingClassComponent;
