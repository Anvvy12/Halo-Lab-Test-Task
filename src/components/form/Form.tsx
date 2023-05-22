import React, { useState, useEffect } from "react";
import {
  fetchCityesData,
  fetchDoctorsSpecialtyData,
  fetchDoctorsNamesData,
} from "./form.gateway";
import {
  City,
  DoctorSpecialty,
  DoctorsNames,
  FormDate,
  ErrorMessage,
} from "../../types";
import { nameValidation, birthdayValidation } from "../../helper";

import "./form.scss";

const Form: React.FC = () => {
  useEffect(() => {
    fetchCityesData().then((data) => setCityArray(data));
    fetchDoctorsSpecialtyData().then((data) => setspecialtyArray(data));
    fetchDoctorsNamesData().then((data) => setNamesArray(data));
  }, []);

  const [formDate, setFormDate] = useState<FormDate>({
    name: "",
    age: 0,
    sex: "",
    city: "",
    specialty: "",
    doctor: "",
    email: "",
    mobileNumber: "",
  });

  const [cityArray, setCityArray] = useState<City[]>([]);
  const [specialtyArray, setspecialtyArray] = useState<DoctorSpecialty[]>([]);
  const [namesArray, setNamesArray] = useState<DoctorsNames[]>([]);

  const [errorMessage, setErrorDateMessage] = useState<ErrorMessage>({
    nameError: "",
    ageError: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;

    if (id === "name") {
      setErrorDateMessage((prevMessage: ErrorMessage) => ({
        ...prevMessage,
        nameError: nameValidation(value) ? "" : "not valid field",
      }));
    }
    if (id === "age") {
      setErrorDateMessage((prevMessage: ErrorMessage) => ({
        ...prevMessage,
        ageError: birthdayValidation(value) ? "not valid field" : "",
      }));
    }

    setFormDate((prevFormDate) => ({
      ...prevFormDate,
      [id]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formDate);
    console.log("Form submitted");
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={formDate.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
          {errorMessage.nameError && (
            <div className="error-message">{errorMessage.nameError}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="birthday">
            Birthday Date:
          </label>
          <input
            type="date"
            id="age"
            className="form-input"
            value={formDate.age}
            onChange={handleInputChange}
            required
          />
          {errorMessage.ageError && (
            <div className="error-message">{errorMessage.ageError}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="sex">
            Sex:
          </label>
          <select
            id="sex"
            className="form-select"
            value={formDate.sex}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="city">
            City:
          </label>
          <select
            id="city"
            className="form-select"
            value={formDate.city}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            {cityArray.map((city) => (
              <option value={city.id} key={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="specialty">
            Doctor Specialty:
          </label>
          <select
            id="specialty"
            className="form-select"
            value={formDate.specialty}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {specialtyArray.map((specialty) => (
              <option value={specialty.id} key={specialty.id}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="doctor">
            Doctor:
          </label>
          <select
            id="doctor"
            className="form-select"
            value={formDate.doctor}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            {namesArray.map((doctor) => (
              <option value={doctor.id} key={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={formDate.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="mobileNumber">
            Mobile Number:
          </label>
          <input
            type="tel"
            id="mobileNumber"
            className="form-input"
            value={formDate.mobileNumber}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
