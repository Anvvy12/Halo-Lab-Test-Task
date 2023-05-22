export interface City {
  id: string;
  name: string;
}
export type DoctorSpecialty = {
  id: string;
  name: string;
  params?: {
    gender?: string;
    maxAge?: number;
    minAge?: number;
  };
};

export type DoctorsNames = {
  id: string;
  name: string;
  surname: string;
  specialityId: string;
  isPediatrician: boolean;
  cityId: string;
};
export type FormDate = {
  name: string;
  age: string;
  sex: string;
  city: string;
  specialty: string;
  doctor: string;
  email: string;
  mobileNumber: string;
};

export type ErrorMessage = {
  nameError: string;
  ageError: string;
  mobileNumberError: string;
  emailError: string;
  contactsError: string;
};
