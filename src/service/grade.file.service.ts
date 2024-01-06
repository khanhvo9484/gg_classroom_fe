import { API_GET_STUDENT_XLSX,
    API_GET_STUDENT_MAPPING_ID_XLSX,
    API_STUDENT_GRADE,
    STUDENT_XLSX_FILE_NAME,
    STUDENT_MAPPING_ID_XLSX_FILE_NAME,
    API_STUDENT_UPLOAD,
    API_STUDENT_MAPPING_ID_UPLOAD
} from '@/api/api.constant';
import FileSaver from 'file-saver';
import { customAxios } from '@/api/custom-axios';

export class GradeFileService {
    async getStudentGradeTemplate(){
        const access_token = localStorage.getItem("access_token");

        fetch(`${import.meta.env.VITE_API_URL}${API_STUDENT_GRADE}${API_GET_STUDENT_XLSX}`, {
            credentials: 'same-origin',
            method: 'get',
            headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
        }).then(function(response) {
            return response.blob();
        }).then(function(blob) {
            FileSaver.saveAs(blob, STUDENT_XLSX_FILE_NAME);
        })

        return;
    }

    async getStudentGradeMappingIdTemplate(){

        const access_token = localStorage.getItem("access_token");

        fetch(`${import.meta.env.VITE_API_URL}${API_STUDENT_GRADE}${API_GET_STUDENT_MAPPING_ID_XLSX}`, {
            credentials: 'same-origin',
            method: 'get',
            headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
        }).then(function(response) {
            return response.blob();
        }).then(function(blob) {
            FileSaver.saveAs(blob, STUDENT_MAPPING_ID_XLSX_FILE_NAME);
        })

        return;
    }

    async uploadStudentList(
        file: File,
        courseId: string
    ) {

        const payload = {
            file: file,
            courseId: courseId
        }

        const response = await customAxios.post(`${API_STUDENT_GRADE}${API_STUDENT_UPLOAD}`,
            payload,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        console.log(response);

        return response;
    }

    async uploadStudentMappingList(
        file: File,
        courseId: string
    ) {

        const payload = {
            file: file,
            courseId: courseId
        }

        const response = await customAxios.post(`${API_STUDENT_GRADE}${API_STUDENT_MAPPING_ID_UPLOAD}`,
            payload,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        console.log(response);

        return response;
    }
}