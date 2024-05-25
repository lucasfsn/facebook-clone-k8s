import * as Yup from 'yup';

export function validateEmail(email: string): RegExpMatchArray {
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.toString().match(emailRegex);
}

export function validateName(name: string): RegExpMatchArray {
  return name
    .toString()
    .match(
      /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/
    );
}

export function validatePassword(password: string): RegExpMatchArray {
  return password
    .toString()
    .match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
}

export function validateBirthdate(birthYear: number): boolean {
  const minAge = new Date().getFullYear() - 13;
  return birthYear <= minAge;
}

export const ProfileImportSchema = Yup.object({
  firstName: Yup.string()
    .required(`First name is missing`)
    .min(2, 'First name must be at least 2 characters long.')
    .max(50, 'First name cannot contain more than 50 characters.')
    .matches(
      /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/,
      'First name cannot contain numbers and special characters.'
    ),
  lastName: Yup.string()
    .required(`Last name is missing`)
    .min(2, 'Last name must be at least 2 characters long.')
    .max(50, 'Last name cannot contain more than 50 characters.')
    .matches(
      /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/,
      'Last name cannot contain numbers and special characters.'
    ),
  birthDay: Yup.number().required(`Birth day is missing.`),
  birthMonth: Yup.number().required(`Birth month is missing.`),
  birthYear: Yup.number()
    .required(`Birth year is missing.`)
    .max(new Date().getFullYear() - 13, 'You must be at least 13 years old.'),
  gender: Yup.string()
    .oneOf(
      ['male', 'female', 'other'],
      'Gender must be "male", "female", or "other"'
    )
    .required('Gender is missing'),
}).noUnknown('Unknown key found. Please check your file');
