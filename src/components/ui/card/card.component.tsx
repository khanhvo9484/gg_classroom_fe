import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IMember } from "../../../models/member.model";

interface Props {
  member: IMember;
}

const CardComponent: React.FC<Props> = ({ member }) => {
  return (
    <Card sx={{ minWidth: 345 }}>
      <CardContent
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={member.avatar}
          sx={{ width: 156, height: 156, mb: 3 }}
        />
        <Typography gutterBottom variant="h5" component="div">
          {member.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {member.bio}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
