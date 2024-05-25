import { BirthDate } from "./user";

export type Gender = "male" | "female" | "other";

export interface ChangeNameData {
  [key: string]: string;
  name: string;
}

export interface ChangeEmailData {
  [key: string]: string;
  email: string;
}

export interface ChangeBirthDateData {
  [key: string]: number;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
}

export interface ChangePasswordData {
  [key: string]: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePassword {
  email: string;
  password: string;
}

export type ChangeUserSettingsType =
  | "firstName"
  | "lastName"
  | "email"
  | "birthDate";

export interface ChangeUserSettings {
  email: string;
  field: ChangeUserSettingsType;
  value: string | BirthDate;
}

export interface ProfileImport {
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  search: {
    user: string;
    createdAt: string;
  }[];
}
