import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MemberListComponent from "./ui/list-member.component";
import { useContext, useEffect, useState } from "react";
import LoadingContext from "@/context/loading.contenxt";
import { ClassService } from "@/service/class.service";
import { useParams } from "react-router-dom";
import { IMember } from "@/models/member.model";
import { IInvitationCourse } from "@/models/class.model";

const MembersPage = () => {
  const classService = new ClassService();
  const { courseId } = useParams();
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [students, setListStudent] = useState<IMember[]>([]);
  const [teachers, setListTeacher] = useState<IMember[]>([]);

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
        startLoading();

        const response = await classService.getAllMemberInCourse(courseId);

        setListTeacher(response.data.memberList.teachers);
        setListStudent(response.data.memberList.students);

        filterMemberInvite(response.data.invitationList);
        stopLoading();
      } catch (error) {
        console.log(error);
        // throw error;
      }
    };

    if (courseId) {
      getAllMemberInCourse(courseId);
    }
  }, []);

  return (
    <Box sx={{ marginY: "2rem", minHeight: "600px" }}>
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
    </Box>
  );
};

export default MembersPage;