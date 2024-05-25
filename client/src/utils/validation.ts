import * as Yup from "yup";

const minAge = new Date().getFullYear() - 13;

export const signUpValidation = () =>
  Yup.object({
    firstName: Yup.string()
      .required(`What's your name?`)
      .min(2, "First name must be at least 2 characters long.")
      .max(50, "First name cannot contain more than 50 characters.")
      .matches(
        /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/,
        "First name cannot contain numbers and special characters.",
      ),
    lastName: Yup.string()
      .required(`What's your name?`)
      .min(2, "Last name must be at least 2 characters long.")
      .max(50, "Last name cannot contain more than 50 characters.")
      .matches(
        /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/,
        "Last name cannot contain numbers and special characters.",
      ),
    email: Yup.string()
      .required(`You'll use this when you log in.`)
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address.",
      ),
    password: Yup.string()
      .required(`Please enter your password.`)
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Enter a 8-character combination of at least one uppercase letter, one lowercase letter, one number, and one special character.",
      ),
    birthDay: Yup.number().required(`Please enter your birth day.`),
    birthMonth: Yup.number().required(`Please enter your birth month.`),
    birthYear: Yup.number()
      .required(
        `It looks like you entered the wrong info. Please be sure to use your real birthday.`,
      )
      .max(minAge, "You must be at least 13 years old."),
    gender: Yup.string().required("Please choose a gender."),
  });

export const loginValidation = () =>
  Yup.object({
    email: Yup.string().required(`Please enter your email.`),
    password: Yup.string().required(`Please enter your password.`),
  });

export const changePasswordValidation = () =>
  Yup.object({
    password: Yup.string()
      .required(`Please enter your new password.`)
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Enter a 8-character combination of at least one uppercase letter, one lowercase letter, one number, and one special character.",
      ),
    confirmPassword: Yup.string()
      .required(`Please confirm your new password.`)
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

export const changeNameValidation = () =>
  Yup.object({
    name: Yup.string()
      .required(`Please enter your new name.`)
      .min(2, "Name must be at least 2 characters long.")
      .max(50, "Name cannot contain more than 50 characters.")
      .matches(
        /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/,
        "Name cannot contain numbers and special characters.",
      ),
  });

export const changeEmailValidation = () =>
  Yup.object({
    email: Yup.string()
      .required(`Please enter your email.`)
      .email(`Please enter a valid email address.`)
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address.",
      ),
  });

export const changeBirthDateValidation = () =>
  Yup.object({
    birthDay: Yup.number().required(`Please enter your birth day.`),
    birthMonth: Yup.number().required(`Please enter your birth month.`),
    birthYear: Yup.number()
      .required(
        `It looks like you entered the wrong info. Please be sure to use your real birthday.`,
      )
      .max(minAge, "You must be at least 13 years old."),
  });

export const ProfileImportSchema = Yup.object({
  firstName: Yup.string()
    .required(`First name is missing`)
    .min(2, "First name must be at least 2 characters long.")
    .max(50, "First name cannot contain more than 50 characters.")
    .matches(
      /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/,
      "First name cannot contain numbers and special characters.",
    ),
  lastName: Yup.string()
    .required(`Last name is missing`)
    .min(2, "Last name must be at least 2 characters long.")
    .max(50, "Last name cannot contain more than 50 characters.")
    .matches(
      /^(?=(?:[^A-Za-z]*[A-Za-z]){2})(?![^\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,]*[\d~`?!^*¨ˆ;@=$%{}\[\]|\\\/<>#“.,])\S+(?: \S+){0,2}$/,
      "Last name cannot contain numbers and special characters.",
    ),
  birthDay: Yup.number().required(`Birth day is missing.`),
  birthMonth: Yup.number().required(`Birth month is missing.`),
  birthYear: Yup.number()
    .required(`Birth year is missing.`)
    .max(minAge, "You must be at least 13 years old."),
  gender: Yup.string()
    .oneOf(
      ["male", "female", "other"],
      'Gender must be "male", "female", or "other"',
    )
    .required("Gender is missing"),
}).noUnknown("Unknown key found. Please check your file");
