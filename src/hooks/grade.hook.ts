import useSWR from "swr";
import { GradeService } from "@/service/grade.service";

function useGrade(courseId: string, studentOfficialId: string) {
  const gradeService = new GradeService();

  const fetcher = async (courseId: string, studentOfficialId: string) => {
    const response = await gradeService.getGradeByStudentId(
      studentOfficialId,
      courseId
    );

    return response.data;
  };

  // const { data, error, isLoading } = useSWR(
  //   `${courseId}/${studentOfficialId}`,
  //   fetcher
  // );

  // return {
  //   data: data,
  //   gradeIsLoading: isLoading,
  //   gradeError: error,
  // };
}

export default useGrade;
