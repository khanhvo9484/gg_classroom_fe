import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MemberListComponent from "./ui/list-member.component";
import { useContext, useEffect, useState } from "react";
// import { ClassService } from "@/service/class.service";
import { useParams } from "react-router-dom";
import UserModel from "@/models/user.model";
import { IInvitationCourse } from "@/models/class.model";
import LinearProgress from "@mui/material/LinearProgress";
import useAllMembers from "@/hooks/all-members.hook";
import LoadingContext from "@/context/loading.contenxt";

const MembersPage = () => {
  document.title = "Thành viên";
  // const classService = new ClassService();
  const { courseId } = useParams();
  const { members, membersMutate } = useAllMembers(courseId);
  // const [isLoading, setIsLoading] = useState(true);
  const { isLoading, startLoading, stopLoading } = useContext(LoadingContext)
  const [students, setListStudent] = useState<UserModel[]>();
  const [teachers, setListTeacher] = useState<UserModel[]>();

  const [studentsInvite, setListStudentInvite] = useState<IInvitationCourse[]>(
    []
  );
  const [teachersInvite, setListTeacherInvite] = useState<IInvitationCourse[]>(
    []
  );

  const filterMemberInvite = (invitationList: IInvitationCourse[]) => {
    const studentsInvite = invitationList?.filter(
      (invitation) => invitation.roleInCourse !== "teacher"
    );
    const teachersInvite = invitationList?.filter(
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
      membersMutate();
    } else {
      const newList = [...studentsInvite, member];

      console.log(newList);

      setListStudentInvite(newList);
      membersMutate();
    }
  };

  useEffect(() => {
    const getAllMemberInCourse = async () => {
      try {
        // setIsLoading(true);
        startLoading();
        // const response = await classService.getAllMemberInCourse(courseId);

        // setListTeacher(response.data.memberList.teachers);
        // setListStudent(response.data.memberList.students);

        // filterMemberInvite(response.data.invitationList);

        membersMutate();
        setListTeacher(members?.memberList.teachers);
        setListStudent(members?.memberList.students);

        filterMemberInvite(members?.invitationList);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        // setIsLoading(false);
        stopLoading();
      }
    };

    if (courseId || !members ||
        members?.memberList.students.length == 0 ||
        members?.memberList.teachers.length == 0 ||
        members?.invitationList.length == 0) {
      getAllMemberInCourse();
    }
  }, [courseId]);

  return (
    <>
      {(isLoading || !members) && <LinearProgress sx={{ top: -5 }} />}
      <Box sx={{ marginY: "2rem", minHeight: "600px" }}>
        {!isLoading && members && (
          <Container
            maxWidth={false}
            sx={{
              //   height: "500px",
              maxWidth: "808px",
            }}
          >
            <MemberListComponent
              members={members?.memberList.teachers}
              membersInvite={
                members?.invitationList.filter(
                (invitation) => invitation.roleInCourse === "teacher"
              )}
              handleAddMemberInvite={handleAddMemberInvite}
              key={1}
              isTeacherList={true}
              title="Giáo viên"
            />
            <MemberListComponent
              members={members?.memberList.students}
              membersInvite={
                members?.invitationList.filter(
                  (invitation) => invitation.roleInCourse !== "teacher"
                )
              }
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
