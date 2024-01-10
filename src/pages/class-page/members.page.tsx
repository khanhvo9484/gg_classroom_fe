import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MemberListComponent from "./ui/list-member.component";
import { useEffect, useState } from "react";
import { ClassService } from "@/service/class.service";
import { useParams } from "react-router-dom";
import UserModel from "@/models/user.model";
import { IInvitationCourse } from "@/models/class.model";
import LinearProgress from "@mui/material/LinearProgress";

const MembersPage = () => {
  const classService = new ClassService();
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [students, setListStudent] = useState<UserModel[]>();
  const [teachers, setListTeacher] = useState<UserModel[]>();

  const [studentsInvite, setListStudentInvite] = useState<IInvitationCourse[]>(
    []
  );
  const [teachersInvite, setListTeacherInvite] = useState<IInvitationCourse[]>(
    []
  );

  const filterMemberInvite = (invitationList: IInvitationCourse[]) => {
    const studentsInvite = invitationList.filter(
      (invitation) => invitation.roleInCourse !== "teacher"
    );
    const teachersInvite = invitationList.filter(
      (invitation) => invitation.roleInCourse === "teacher"
    );

    setListStudentInvite(studentsInvite);
    setListTeacherInvite(teachersInvite);
  };

  const handleAddMemberInvite = (
    member: IInvitationCourse,
    isTeacherInvite: boolean
  ) => {
    if (isTeacherInvite) {
      const newList = [...teachersInvite, member];

      console.log(newList);
      setListTeacherInvite(newList);
    } else {
      const newList = [...studentsInvite, member];

      console.log(newList);

      setListStudentInvite(newList);
    }
  };

  useEffect(() => {
    const getAllMemberInCourse = async (courseId: string) => {
      try {
        setIsLoading(true);
        // startLoading();
        const response = await classService.getAllMemberInCourse(courseId);

        setListTeacher(response.data.memberList.teachers);
        setListStudent(response.data.memberList.students);

        filterMemberInvite(response.data.invitationList);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
        // stopLoading();
      }
    };

    if (courseId) {
      getAllMemberInCourse(courseId);
    }
  }, []);

  return (
    <>
      {isLoading && <LinearProgress sx={{ top: -5 }} />}
      <Box sx={{ marginY: "2rem", minHeight: "600px" }}>
        {!isLoading && (
          <Container
            maxWidth={false}
            sx={{
              //   height: "500px",
              maxWidth: "808px",
            }}
          >
            <MemberListComponent
              members={teachers}
              membersInvite={teachersInvite}
              handleAddMemberInvite={handleAddMemberInvite}
              key={1}
              isTeacherList={true}
              title="Giáo viên"
            />
            <MemberListComponent
              members={students}
              membersInvite={studentsInvite}
              handleAddMemberInvite={handleAddMemberInvite}
              key={2}
              isTeacherList={false}
              title="Sinh viên"
            />
          </Container>
        )}
      </Box>
    </>
  );
};

export default MembersPage;
