export interface SignUpData {
  [key: string]: string | number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  gender: string;
}

export interface LoginData {
  [key: string]: string;
  email: string;
  password: string;
}
