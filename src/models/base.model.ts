export interface IBaseResponse<T> {
  statusCode: string;
  message: string;
  data: T;
}
