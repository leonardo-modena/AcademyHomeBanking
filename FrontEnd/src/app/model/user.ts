export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: number;
  gender: string;
  role: string;
  bankAccounts: number[];
}
