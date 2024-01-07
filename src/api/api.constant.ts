export const API_GOOGLE_LOGIN = "/auth/google";
export const API_FACEBOOK_LOGIN = "/auth/facebook";
export const API_VERIFY_LOGIN_OAUTH = "/auth/verify-login/{idUser}";

export const API_GET_USER_BY_ID = "/users/user/{idUser}";
export const API_UPDATE_USER = "/users/user";

export const API_COURSES = "/courses";
export const API_GET_ALL_COURSE = "/all";
export const API_GET_ALL_ARCHIVED_COURSE = "/all-archived";
export const API_GET_COURSE_BY_ID = "/course/{courseId}";
export const API_SEND_INVITATION = "/send-invitation";
export const API_GET_ALL_COURSE_MEMBER = "/get-all-course-member";
export const API_JOIN_BY_TOKEN = "/join-by-token";
export const API_JOIN_BY_CODE = "/join-by-invite-code";

export const API_GRADE_REVIEW = "/home";
export const API_GET_ALL_GRADE_REVIEW = "/home";

export const API_STUDENT_GRADE = "/student-grade";
export const API_GET_STUDENT_XLSX = "/student-xlsx-template";
export const API_GET_STUDENT_MAPPING_ID_XLSX =
  "/student-mapping-id-xlsx-template";
export const STUDENT_XLSX_FILE_NAME = "student-template.xlsx";
export const STUDENT_MAPPING_ID_XLSX_FILE_NAME =
  "student-mapping-id-template.xlsx";
export const API_STUDENT_UPLOAD = "/upload-student-list";
export const API_STUDENT_MAPPING_ID_UPLOAD = "/upload-student-mapping-id";

export const API_GET_GRADE_STRUCTURE = "/get/{courseId}";

export const API_GRADE_STRUCTURE = "/grade-structure";
export const API_GET_GRADE_STRUTURE = "/get";
export const API_UPDATE_GRADE_REWRITE = "/update-grade-rewrite";

export const API_GET_STUDENT_GRADE_BOARD = "/student-grade-board/{courseId}";
