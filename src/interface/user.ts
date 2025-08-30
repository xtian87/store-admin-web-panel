export interface User {
  id: number;
  uid: string;
  email: string;
  role_id: number;
  created_at: string;
  name?: string;
  last_name?: string;
  birthday: string;
  status: boolean;
  password: string;
  role: {
    id: number;
    text: string;
  };
}
