import UserModel from "./user.model";

export interface INotification {
  id: string;
  title: string;
  content: string;
  type: string;
  targetId: string;
  createAt: string;
  isRead: boolean;
  user: UserModel;
  actor: UserModel;
}

export enum NotificationType {
  NEW_GRADE_STRUCTURE = "new_grade_structure",
  NEW_GRADE_FINALIZE = "new_grade_finalize",
  NEW_GRADE_REVIEW = "new_grade_review",
  NEW_GRADE_REVIEW_COMMENT = "new_grade_review_comment",
}
