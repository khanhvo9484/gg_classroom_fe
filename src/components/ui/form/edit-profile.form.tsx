import Grid from "@mui/material/Unstable_Grid2";
import { CardActions, CardHeader, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IMember, IMemberRespone } from "../../../models/member.model";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  STRING_ERROR,
  STRING_REQUIRED_NAME,
  STRING_UPDATE_PROFILE_SUCCESS,
} from "../../../constant/ui/ui.constant";
import { formatDate, formatDate_YYYY_MM_DD } from "../../../utils/common.util";
import { API_UPDATE_USER } from "../../../api/api.constant";
import toast from "react-hot-toast";
import { customAxios } from "../../../api/custom-axios";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../../redux/auth.slice";
import { LoadingButton } from "@mui/lab";

interface Props {
  member: IMember;
  openEditForm: () => void;
  updateUser: (user: IMember) => void;
}

type FormValue = {
  name: string;
  phoneNumber: string;
  dob: string;
  bio: string;
};
const EditProfileForm: React.FC<Props> = ({
  member,
  openEditForm,
  updateUser,
}) => {
  const dispatch = useDispatch();
  const [userEdit, setUserEdit] = useState<IMember>(member);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { control, register, handleSubmit, formState, setValue } =
    useForm<FormValue>({
      defaultValues: {
        name: userEdit.name,
        phoneNumber: userEdit.phoneNumber,
        dob: userEdit.dob,
        bio: userEdit.bio,
      },
    });

  const { errors } = formState;
  //   const accessToken = useSelector((state) => state.auth.access_token);

  const onSubmit = async (data: FormValue) => {
    const valueForm = {
      ...data,
      dob: dayjs.isDayjs(data.dob)
        ? data.dob.format("YYYY-MM-DD")
        : formatDate_YYYY_MM_DD(data.dob),
    };

    setLoading(true);
    try {
      const { data: response } = await customAxios.put<IMemberRespone>(
        API_UPDATE_USER,
        valueForm
      );

      const formattedDob = response.data.dob
        ? formatDate(response.data.dob)
        : undefined;

      const userRespone: IMember = {
        ...response.data,
        dob: formattedDob,
      };

      setLoading(false);
      toast.success(STRING_UPDATE_PROFILE_SUCCESS);
      updateUser(userRespone);
      dispatch(updateUserProfile({ user: userRespone }));
      openEditForm();
    } catch (error) {
      toast.error(STRING_ERROR);
    }
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    const user = {
      ...userEdit,
      name: newName,
    };

    setUserEdit(user);
    setValue("name", newName, { shouldValidate: true });
  };

  const handleChangeBio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const user = {
      ...userEdit,
      bio: event.target.value,
    };

    setUserEdit(user);
  };

  return (
    <Grid container spacing={2} sx={{ height: "400px" }}>
      <Grid xs={4}>
        <Box sx={{ height: "100%" }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent
              sx={{
                mt: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src={userEdit.avatar}
                sx={{ width: 156, height: 156, mb: 3 }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontWeight: 600 }}
              >
                {userEdit.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userEdit.bio}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton>
                  <FacebookIcon fontSize="large" />
                </IconButton>
                <IconButton>
                  <InstagramIcon fontSize="large" />
                </IconButton>
                <IconButton>
                  <LinkedInIcon fontSize="large" />
                </IconButton>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Grid>
      <Grid xs={8}>
        <Box sx={{ height: "100%" }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardHeader
              title="Thiết lập tài khoản"
              sx={{
                borderBottom: "1px solid #ccc",
                backgroundColor: "#f8f9fa",
              }}
            />
            <CardContent>
              <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} sx={{ my: 1 }}>
                  <Grid xs={6}>
                    <Typography gutterBottom sx={{ fontWeight: 550 }}>
                      Họ và Tên*
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      id="outlined-basic"
                      variant="outlined"
                      value={userEdit.name}
                      {...register("name", {
                        required: STRING_REQUIRED_NAME,
                      })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeName(event)
                      }
                    />
                  </Grid>
                  <Grid xs={6}>
                    <Typography gutterBottom sx={{ fontWeight: 550 }}>
                      Số điện thoại
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      id="outlined-basic"
                      variant="outlined"
                      defaultValue={userEdit.phoneNumber}
                      {...register("phoneNumber")}
                    />
                  </Grid>
                  <Grid xs={6}>
                    <Typography gutterBottom sx={{ fontWeight: 550 }}>
                      Ngày sinh
                    </Typography>
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          format="DD/MM/YYYY"
                          sx={{ width: "100%" }}
                          slotProps={{
                            textField: { size: "small" },
                          }}
                          value={dayjs(userEdit.dob, "DD/MM/YYYY")}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Typography gutterBottom sx={{ fontWeight: 550 }}>
                      Mô tả
                    </Typography>
                    <TextField
                      id="outlined-textarea"
                      placeholder=""
                      multiline
                      rows={5}
                      sx={{ width: "100%" }}
                      size="small"
                      defaultValue={userEdit.bio}
                      {...register("bio")}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeBio(event)
                      }
                    />
                  </Grid>
                </Grid>
                <Box sx={{ my: 2, float: "right", display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => openEditForm()}
                  >
                    Hủy
                  </Button>{" "}
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isLoading}
                  >
                    {isLoading ? "loading..." : "Cập nhật"}
                  </LoadingButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditProfileForm;
