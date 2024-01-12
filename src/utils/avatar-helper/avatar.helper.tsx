import UserModel from "@/models/user.model";
import { SxProps } from "@mui/material";
import Avatar from "@mui/material/Avatar";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
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

function stringAvatar(user: UserModel, sx: SxProps) {
  try {
    const nameParts = user?.name.split(" ");
    let displayName = "";

    if (nameParts?.length > 1) {
      displayName = user.name.split(" ")[0][0] + user.name.split(" ")[1][0];
    } else {
      displayName = user?.name.split(" ")[0][0];
    }

    return {
      sx: {
        ...sx,
        bgcolor: stringToColor(user?.name),
      },
      children: displayName,
    };
  } catch (err) {
    return {
      // sx: {
      //   ...sx,
      //   bgcolor: stringToColor(""),
      // },
      // children: "",
    };
  }
}

interface Props {
  user: UserModel;
  sx: SxProps;
}

const AvatarHelper: React.FC<Props> = ({ user, sx }) => {
  if (user?.avatar) {
    return <Avatar src={user.avatar} sx={sx} />;
  } else {
    return <Avatar {...stringAvatar(user, sx)} />;
  }
};

export default AvatarHelper;
