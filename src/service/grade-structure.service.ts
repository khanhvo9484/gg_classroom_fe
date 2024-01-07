import {
    API_GRADE_STRUCTURE,
    API_GET_GRADE_STRUTURE,
} from "@/api/api.constant";
import { customAxios } from "@/api/custom-axios";
import { IGradeStructureComponentRespone
} from "@/models/grade-structure.model";

export class GradeStructureService {
    async getGradeStructure(courseId: string): Promise<IGradeStructureComponentRespone> {
        const { data: response } = await customAxios.get<IGradeStructureComponentRespone>(
            `${API_GRADE_STRUCTURE}${API_GET_GRADE_STRUTURE}/${courseId}`
        );

        return response;
    }
}
