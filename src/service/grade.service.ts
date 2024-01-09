import {
    API_STUDENT_GRADE
} from "@/api/api.constant";
import { customAxios } from "@/api/custom-axios";
import { IGradeResponse } from "@/models/grade.model";

const mockData = {
    statusCode: "200",
    message: "thành công",
    data: {
        id: "101",
        createdAt: "today",
        updatedAt: "today",
        gradeComponent: [
        {
            gradeComponentId: "1",
            gradeComponentName: "BTVN",
            percentage: 30,
            totalGrade: 10,
            gradeSubComponent: [
                {
                    gradeSubComponentId: "2",
                    gradeSubComponentName: "BTVN1",
                    percentage: 20,
                    grade: 10
                },
                {
                    gradeSubComponentId: "3",
                    gradeSubComponentName: "BTVN2",
                    percentage: 30,
                    grade: 10
                },
                {
                    gradeSubComponentId: "4",
                    gradeSubComponentName: "BTVN3",
                    percentage: 50,
                    grade: 10
                },
            ]
        },
        {
            gradeComponentId: "5",
            gradeComponentName: "Giữa kỳ",
            percentage: 20,
            totalGrade: 10,
            gradeSubComponent: []
        },
        {
            gradeComponentId: "6",
            gradeComponentName: "Cuối kỳ",
            percentage: 50,
            totalGrade: 10,
            gradeSubComponent: []
        }
    ]}
}

export class GradeService {
    async getGrade(courseId_studentOfficialId_String): Promise<IGradeResponse> {
        const { data: response } = await customAxios.get<IGradeResponse>(
            `${API_STUDENT_GRADE}/${courseId_studentOfficialId_String}/`
        );
        console.log(courseId_studentOfficialId_String);

        return response;
    }
}
