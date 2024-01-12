import {
  API_ADMIN,
  API_ADMIN_BLOCK_USER,
  API_ADMIN_UN_BLOCK_USER,
  API_ADMIN_STUDENT_TEMPLATE,
  STUDENT_MAPPING_ID_XLSX_FILE_NAME,
  API_ADMIN_UPLOAD_STUDENT_ID,
} from "@/api/api.constant";
import { customAxios } from "@/api/custom-axios";
import { IBaseResponse } from "@/models/base.model";
import { File } from "buffer";
import FileSaver from "file-saver";

export interface response {}

export class AdminService {
  async blockUser(userId: string): Promise<IBaseResponse<response>> {
    const response = await customAxios.post<IBaseResponse<response>>(
      `${API_ADMIN}${API_ADMIN_BLOCK_USER}`,
      { userId: userId }
    );

    return response.data;
  }
  async unblockUser(userId: string): Promise<IBaseResponse<response>> {
    const response = await customAxios.post<IBaseResponse<response>>(
      `${API_ADMIN}${API_ADMIN_UN_BLOCK_USER}`,
      { userId: userId }
    );

    return response.data;
  }
  async updateOfficialId(
    userId: string,
    officialId: string
  ): Promise<IBaseResponse<response>> {
    const response = await customAxios.post<IBaseResponse<response>>(
      `/admin/update-user-official-id`,
      { userId: userId, officialId: officialId }
    );
    return response.data;
  }
  async downloadStudentIdTemplate() {
    const access_token = localStorage.getItem("access_token");

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }${API_ADMIN}${API_ADMIN_STUDENT_TEMPLATE}`,
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
        console.log(response);
        return response.blob();
      })
      .then(function (blob) {
        FileSaver.saveAs(blob, STUDENT_MAPPING_ID_XLSX_FILE_NAME);
      });

    return;
  }

  async uploadStudentMapping(file: File) {
    const payload = {
      file: file
    };

    const response = await customAxios.post(
      `${API_ADMIN}${API_ADMIN_UPLOAD_STUDENT_ID}`,
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
