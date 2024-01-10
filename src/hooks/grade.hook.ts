// import useSWR from "swr";
// import { GradeService } from "@/service/grade.service";

// function useGrade(courseId: string, studentOfficialId: string) {
//   const gradeService = new GradeService();

//   const fetcher = async (courseId_studentOfficialId_String: string) => {
//     const response = await gradeService.getGrade(
//       courseId_studentOfficialId_String
//     );

//     return response.data;
//   };

//   const { data, error, isLoading } = useSWR(
//     `${courseId}/${studentOfficialId}`,
//     fetcher
//   );

//   return {
//     data: data,
//     gradeIsLoading: isLoading,
//     gradeError: error,
//   };
// }

// export default useGrade;
