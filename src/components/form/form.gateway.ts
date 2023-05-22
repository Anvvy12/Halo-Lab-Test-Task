import { City, DoctorSpecialty, DoctorsNames } from "../../types";

export const fetchCityesData = async (): Promise<City[]> => {
  const response = await fetch(
    "https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4"
  );
  const data = await response.json();
  return data as City[];
};

export const fetchDoctorsSpecialtyData = async (): Promise<
  DoctorSpecialty[]
> => {
  const response = await fetch(
    "https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca"
  );
  const data = await response.json();
  return data as DoctorSpecialty[];
};

export const fetchDoctorsNamesData = async (): Promise<DoctorsNames[]> => {
  const response = await fetch(
    "https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21"
  );
  const data = await response.json();
  return data as DoctorsNames[];
};
