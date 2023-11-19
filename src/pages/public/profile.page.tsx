import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { IMember, IMemberRespone } from "../../models/member.model";
import EditProfileForm from "../../components/ui/form/edit-profile.form";
import BackgroundCover from "../../components/ui/background-cover.component";
import ProfileComponent from "../../components/ui/profile.component";
import { useEffect, useState } from "react";
import { customAxios } from "../../api/custom-axios";
import { API_GET_USER_BY_ID } from "../../api/api.constant";
import { formatDate } from "../../utils/common.util";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth.slice";

const ProfilePage = () => {
  const [isOpenEditForm, setOpenEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IMember>();

  const userProfile = useSelector(selectUser);

  useEffect(() => {
    setLoading(true);
    const getUserById = async () => {
      try {
        const { data: response } = await customAxios.get<IMemberRespone>(
          API_GET_USER_BY_ID.replace("{idUser}", userProfile.id)
        );

        const formattedDob = response.data.dob
          ? formatDate(response.data.dob)
          : undefined;

        const userRespone: IMember = {
          ...response.data,
          dob: formattedDob,
        };

        setUser(userRespone);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (userProfile.id) {
      getUserById();
    }
  }, [userProfile.id]);

  const openEditForm = () => {
    setOpenEditForm(!isOpenEditForm);
  };

  const updateUser = (user: IMember) => {
    setUser(user);
  };

  return (
    <>
      <BackgroundCover />
      <Box
        sx={{
          position: "relative",
          zIndex: 0,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            pb: 3,
            height: "700px",
          }}
        >
          <Box sx={{ width: "920px" }}>
            {user && !loading ? (
              !isOpenEditForm ? (
                <ProfileComponent member={user} openEditForm={openEditForm} />
              ) : (
                <EditProfileForm
                  member={user}
                  openEditForm={openEditForm}
                  updateUser={updateUser}
                />
              )
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProfilePage;
