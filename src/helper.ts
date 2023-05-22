export const nameValidation = (name: string) => {
  const regex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return !regex.test(name);
};

export const birthdayValidation = (value: string) => {
  return new Date(value) >= new Date();
};
