import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import IconButton from "@mui/material/IconButton";
import InviteModalComponent from "./invite-modal.component";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import {
  IInvitationCourse,
  IInvitationCourseRequest,
} from "@/models/class.model";
import { ClassService } from "@/service/class.service";
import { IMember } from "@/models/member.model";
import { useParams } from "react-router-dom";
import RoleContext from "@/context/role.context";

interface Props {
  title: string;
  isTeacherList: boolean;
  members: IMember[];
  membersInvite: IInvitationCourse[];
  handleAddMemberInvite: (
    newInvitation: IInvitationCourse,
    isTeacherList: boolean
  ) => void;
}

const MemberListComponent: React.FC<Props> = ({
  title,
  isTeacherList,
  members,
  membersInvite,
  handleAddMemberInvite,
}) => {
  const classService = new ClassService();
  const { courseId } = useParams();

  const [isOpenModalInvite, setOpenModalInvite] = useState(false);
  const [isLoadingInvitation, setLoadingInvitation] = useState(false);
  const owner = useSelector(selectUser);
  const { isTeacher } = useContext(RoleContext);

  const handleAddMember = () => {
    setOpenModalInvite(true);
  };

  const handleCloseModalInvite = () => {
    setOpenModalInvite(!isOpenModalInvite);
  };

  const handleInviteMember = async (email: string) => {
    const invitationRequest: IInvitationCourseRequest = {
      inviterId: owner.id,
      inviteeEmail: email,
      courseId: courseId,
      roleInCourse: isTeacherList ? "teacher" : "student",
    };

    try {
      setLoadingInvitation(true);
      const response = await classService.sendInvitationToJoinCourse(
        invitationRequest
      );

      setLoadingInvitation(false);
      handleCloseModalInvite();
      handleAddMemberInvite(response.data, isTeacherList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ marginTop: 4, marginBottom: 10 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgb(95,99,104)",
          paddingBottom: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
        >
          {title}
        </Typography>
        {isTeacher && (
          <IconButton
            aria-label="settings"
            size="large"
            sx={{ color: "rgb(25,103,210)" }}
            onClick={() => handleAddMember()}
          >
            <PersonAddAltOutlinedIcon fontSize="inherit" />
          </IconButton>
        )}
        {isOpenModalInvite && (
          <InviteModalComponent
            handleCloseModalInvite={handleCloseModalInvite}
            handleInviteMember={handleInviteMember}
            isOpenModalInvite={isOpenModalInvite}
            isLoadingInvitation={isLoadingInvitation}
            isTeacherList={isTeacherList}
          />
        )}
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {members &&
          members.map((member, index) => {
            return (
              <>
                <ListItem key={index} alignItems="center">
                  <ListItemAvatar sx={{ marginTop: 0, minWidth: 50 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#4173E0",
                        width: 32,
                        height: 32,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {member.name}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider
                  sx={{ marginTop: 1 }}
                  variant="fullWidth"
                  component="li"
                />
              </>
            );
          })}
        {membersInvite &&
          membersInvite.map((member, index) => {
            return (
              <>
                <ListItem key={index} alignItems="center">
                  <ListItemAvatar sx={{ marginTop: 0, minWidth: 50 }}>
                    <Avatar sx={{ width: 32, height: 32 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: "#3c4043",
                          opacity: "0.54",
                        }}
                      >
                        {member.inviteeEmail} &nbsp; (đã được mời)
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider
                  sx={{ marginTop: 1 }}
                  variant="fullWidth"
                  component="li"
                />
              </>
            );
          })}
      </List>
    </Box>
  );
};

export default MemberListComponent;