import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";

const ScoreTypeComponent = () => {
  return (
    <>
      <Box sx={{ mb: "1rem", zIndex: 99999999 }}>
        <FormControl required={true} variant="filled" sx={{ mr: 3 }}>
          <InputLabel htmlFor="component-filled">Danh mục điểm</InputLabel>
          <FilledInput id="component-filled" defaultValue="" />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormHelperText id="component-error-text">Bắt buộc</FormHelperText>
            <Typography sx={{ mr: 2, mt: "3px" }} variant="caption">
              90/100
            </Typography>
          </Box>
        </FormControl>
        <FormControl required variant="filled" sx={{ mr: 1 }}>
          <InputLabel htmlFor="component-filled">Số điểm mặc định</InputLabel>
          <FilledInput id="component-filled" defaultValue="100" />
        </FormControl>
        <IconButton size="large">
          <CloseIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default ScoreTypeComponent;
