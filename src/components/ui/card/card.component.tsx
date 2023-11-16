import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CardComponent({ member }) {
  return (
    <Card sx={{ minWidth: 345 }}>
      {/* <CardMedia
        sx={{ height: 200 }}
        image={member.image}
        title="green iguana"
      /> */}

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
          src={member.image}
          sx={{ width: 156, height: 156, mb: 3 }}
        />
        <Typography gutterBottom variant="h5" component="div">
          {member.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {member.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
