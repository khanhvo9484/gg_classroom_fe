import { NavLink } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';


export default function ListItemNavLinkAvatar ({link, course, setCurrentPage}){
    console.log(link);
    return (
        <ListItemButton LinkComponent={NavLink} to={link}
            onClick={() => setCurrentPage(course.name)}
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
            <Avatar sx={{ minWidth: 30,
                        minHeight: 30,
                        mr: 2
                        }}
                        src={course.courseOwner.avatar}>
            </Avatar>
            <ListItemText primary={course.name}
                        secondary={course.description}/>
        </ListItemButton>
    )
}