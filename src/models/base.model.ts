export interface IBase {
  id: string;
  createdAt: string;
  createdBy?: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface IBaseResponse<T> {
  statusCode: string;
  message: string;
  data: T;
}
