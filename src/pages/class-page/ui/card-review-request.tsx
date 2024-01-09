import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";
import UserModel from "@/models/user.model";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import CommentComponent from "./comment.component";
import { Button, Divider, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import RoleContext from "@/context/role.context";
import CommentInputComponent from "./comment-input.component";

interface Props {
    account: UserModel
}

const GradeReviewPost: React.FC<Props> = ({
    account
}) => {
    const {courseId} = useParams();
    const {reviewId} = useParams();

    const { isTeacher, } = useContext(RoleContext);

    console.log(courseId);
    console.log(reviewId);
    console.log(isTeacher);

    return (
        <Card
        sx={{
            width: "100%",
            borderRadius: "0.5rem",
            border: "0.0625rem solid #dadce0",
        }}
        variant="outlined"
        >
            <CardHeader
                sx={{ paddingBottom: "0" }}
                avatar={
                    <AvatarHelper sx={{}} user={account}/>
                }
                action={
                    <>
                        {isTeacher && (
                            <Button variant="contained">
                                Sửa điểm
                            </Button>
                        )}
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    </>
                }
                title={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Khầy Khan
                    </Typography>
                }
                subheader="December 12, 2023"
            />
            <CardContent sx={{ borderBottom: "0.0625rem solid #dadce0" }}>
                <Grid container sx={{ my: 1}}>
                    <Grid xs={2}></Grid>
                    <Grid xs={4} container rowSpacing={1}>
                        <Grid xs={12}>
                            <Card>
                                <CardHeader
                                title={
                                    <Typography variant="h6" sx={{ fontWeight: 550 }}>
                                        {`Phúc khảo điểm BTVN môn toán`}
                                    </Typography>
                                }/>
                            </Card>
                        </Grid>
                        <Grid xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="body1" color="text.main">
                                        Điểm hiện tại: 10
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="body1" color="text.main">
                                        Điểm mong muốn: 10
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid xs={12}>
                            <Card>
                                <CardHeader title={
                                    <Typography variant="h6" sx={{ fontWeight: 550 }}>
                                        {`Lý do`}
                                    </Typography>
                                }
                                sx={{maxHeight:5}}/>
                                <Divider />
                                <CardContent>
                                    <Typography variant="body1" color="text.main">
                                        {`Vì thích thế`}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid xs={1}></Grid>
                    <Grid xs={4}>
                        <Card sx={{height: "95%"}}>
                            <CardHeader title={
                                <Typography variant="h6" sx={{ fontWeight: 550 }}>
                                    {`Minh chứng`}
                                </Typography>
                            }/>
                            <Divider />
                            <CardContent
                            sx={{
                                display: "flex",
                                justifyContent:"center",
                            }}>
                                <img
                                    src={"https://th.bing.com/th/id/R.2b67507bc688b741fee318af9506d5ec?rik=ZX7wqbJJAtPTyw&riu=http%3a%2f%2fclipart-library.com%2fimg%2f952237.png&ehk=ABOxpusyEfjVw9LgAkVmMBT7t%2bhAIMRbNh2LavXmn3E%3d&risl=&pid=ImgRaw&r=0"}
                                    alt={"Minh chứng"}
                                    width={"auto"}
                                    height={250}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
            <CommentComponent />
            <CommentComponent />
            <CommentInputComponent />
            <CardActions disableSpacing></CardActions>
        </Card>
    );
};

export default GradeReviewPost;
