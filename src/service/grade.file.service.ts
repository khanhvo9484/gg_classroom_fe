import {
  API_GET_STUDENT_XLSX,
  API_GET_STUDENT_MAPPING_ID_XLSX,
  API_STUDENT_GRADE,
  STUDENT_XLSX_FILE_NAME,
  STUDENT_MAPPING_ID_XLSX_FILE_NAME,
  API_STUDENT_UPLOAD,
  API_STUDENT_MAPPING_ID_UPLOAD,
  API_GET_STUDENT_GRADE_XLSX_TEMPLATE,
  API_UPLOAD_STUDENT_GRADE,
} from "@/api/api.constant";
import FileSaver from "file-saver";
import { customAxios } from "@/api/custom-axios";
import { IStudentBoardGradeResponse } from "@/models/grade.model";

export class GradeFileService {
  async getStudentGradeTemplate() {
    const access_token = localStorage.getItem("access_token");

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }${API_STUDENT_GRADE}${API_GET_STUDENT_XLSX}`,
      {
        credentials: "same-origin",
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        FileSaver.saveAs(blob, STUDENT_XLSX_FILE_NAME);
      });

    return;
  }

  async getStudentGradeMappingIdTemplate(courseId: string) {
    const access_token = localStorage.getItem("access_token");

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }${API_STUDENT_GRADE}${API_GET_STUDENT_MAPPING_ID_XLSX}/${courseId}`,
      {
        credentials: "same-origin",
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        FileSaver.saveAs(blob, STUDENT_MAPPING_ID_XLSX_FILE_NAME);
      });

    return;
  }

  async getStudentGradeTemplateById(
    courseId: string,
    gradeComponentId: string
  ) {
    const access_token = localStorage.getItem("access_token");

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }${API_STUDENT_GRADE}${API_GET_STUDENT_GRADE_XLSX_TEMPLATE}/${courseId}?grade-component-id=${gradeComponentId}`,
      {
        credentials: "same-origin",
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        FileSaver.saveAs(blob, STUDENT_MAPPING_ID_XLSX_FILE_NAME);
      });

    return;
  }

  async uploadStudentList(
    file: File,
    courseId: string
  ): Promise<IStudentBoardGradeResponse> {
    const payload = {
      file: file,
      courseId: courseId,
    };

    const { data: response } =
      await customAxios.post<IStudentBoardGradeResponse>(
        `${API_STUDENT_GRADE}${API_STUDENT_UPLOAD}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

    return response;
  }

  async uploadStudentGradeById(
    file: File,
    courseId: string,
    gradeComponentId: string
  ) {
    const payload = {
      file: file,
      courseId: courseId,
      gradeComponentId: gradeComponentId,
    };

    const response = await customAxios.post(
      `${API_STUDENT_GRADE}${API_UPLOAD_STUDENT_GRADE}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  }

  async uploadStudentMappingList(file: File, courseId: string) {
    const payload = {
      file: file,
      courseId: courseId,
    };

    const response = await customAxios.post(
      `${API_STUDENT_GRADE}${API_STUDENT_MAPPING_ID_UPLOAD}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  }
}
