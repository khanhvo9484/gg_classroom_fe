import ListItem from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography, styled } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

export default function ListItemAdmin({ text, Icon, onClick, isUpload }) {
  return (
        <ListItem
            sx={{
                underline: "none",
                maxWidth: 280,
                ml: 1
            }}
            onClick={isUpload ? () => {console.log(2)} : () => onClick()}
            component={isUpload ? "label" : "li"}
        >
            <ListItemIcon>
                <Icon fontSize="medium" />
            </ListItemIcon>
            <ListItemText
                primary={
                <Typography
                    noWrap={true}
                    variant="body1"
                    color="text.primary"
                    fontSize={16}
                    sx={{
                    underline: "none",
                    }}
                >
                    {text}
                </Typography>
                }
            />
            {isUpload && (
                <VisuallyHiddenInput
                    type="file"
                    onInputCapture={(event) => {
                        onClick(event);
                    }}
                />
            )}
        </ListItem>
    )
}
