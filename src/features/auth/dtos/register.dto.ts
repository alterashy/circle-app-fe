export interface RegisterResponse {
  code: number;
  status: string;
  message: string;
  data: {
    id: string;
    fullname: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}
