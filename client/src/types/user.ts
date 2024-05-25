import { LoginData, SignUpData } from "./auth";
import {
  ChangeBirthDateData,
  ChangeEmailData,
  ChangeNameData,
  ChangePasswordData,
} from "./settings";

export interface BirthDate {
  birthDay: number;
  birthMonth: number;
  birthYear: number;
}

export interface SettingsChangePayload {
  field: keyof SingleUser;
  value: string | BirthDate;
}

export interface SingleUser {
  id: string;
  username: string;
  picture: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: BirthDate;
}

export type FormInputData = {
  [key: string]: string | number;
} & (
  | ChangePasswordData
  | ChangeNameData
  | ChangeEmailData
  | ChangeBirthDateData
  | LoginData
  | SignUpData
);
