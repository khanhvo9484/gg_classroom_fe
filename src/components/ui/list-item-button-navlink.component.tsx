import { NavLink } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


export default function ListItemNavLink ({link, text, Icon}){
    return (
        <ListItemButton LinkComponent={NavLink} to={link}
            onClick={() => setCurrentPage(text)}
            sx={{
                ml:1,
                maxWidth: 280,
                "&.active": {
                    backgroundColor:'secondary.main',
                    borderTopRightRadius: 32,
                    borderBottomRightRadius: 32,
                },
            }}
        >
            <ListItemIcon>
                <Icon fontSize="medium"/>
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
    )
}