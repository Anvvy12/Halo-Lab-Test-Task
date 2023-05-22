import { ErrorMessage } from "./types";

export const nameValidation = (name: string) => {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(name);
};

export const birthdayValidation = (value: string) => {
  return new Date(value) <= new Date();
};

export const calculateAge = (birthday: string): number => {
  const birthDate = new Date(birthday);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const phoneValidation = (phoneNumber: string) => {
  const regex = /^\d{10}$/;
  return phoneNumber === "" ? true : regex.test(phoneNumber);
};

export const isForValid = (errorObject: ErrorMessage) => {
  return Object.values(errorObject).every((value) => value === "");
};
