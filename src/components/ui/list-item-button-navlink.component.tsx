import { NavLink } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from "@mui/material";

export default function ListItemNavLink ({link, text, Icon}){
    return (
        <NavLink to={link}
            style={() => {
                return {
                textDecoration: "none",
                };
            }}>
                {({ isActive}) => (
                    <ListItemButton
                    sx={{
                        underline:"none",
                        ml:1,
                        maxWidth: 280,
                        fontWeight: isActive ? "bold" : "",
                        backgroundColor: isActive ? 'secondary.main' : "",
                        borderTopRightRadius: isActive ? 32 : 0,
                        borderBottomRightRadius: isActive ? 32 : 0,
                    }}
                >
                    <ListItemIcon>
                        <Icon fontSize="medium"/>
                    </ListItemIcon>
                    <ListItemText primary={<Typography
                        variant="h6"
                        color="text.primary"
                        sx={{
                        underline:"none",
                        }}
                    >
                        {text}
                    </Typography>} />
                </ListItemButton>
            )}
        </NavLink>
    )
}