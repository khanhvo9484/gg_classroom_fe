import UserModel from "@/models/user.model";
import Avatar from "@mui/material/Avatar";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: { name: string }) {
  const nameParts = name.name.split(" ");
  let displayName = "";

  if (nameParts.length > 1) {
    displayName = name.name.split(" ")[0][0] + name.name.split(" ")[1][0];
  } else {
    displayName = name.name.split(" ")[0][0];
  }

  return {
    sx: {
      bgcolor: stringToColor(name.name),
    },
    children: displayName,
  };
}

interface Props {
  user: UserModel;
}

const AvatarHelper: React.FC<Props> = ({ user }) => {
  if (user.avatar) {
    return <Avatar src={user.avatar} />;
  } else {
    return <Avatar {...stringAvatar({ name: user.name })} />;
  }
};

export default AvatarHelper;
