/* eslint-disable array-callback-return */
import React, { useState, useEffect, useCallback } from "react";
import { fetchCityes, fetchSpecialty, fetchDoctors } from "./form.gateway";
import { City, Specialty, Names, FormDate, ErrorMessage } from "../../types";
import {
  nameValidation,
  birthdayValidation,
  phoneValidation,
  isFormValid,
  filterDoctorsByAge,
} from "../../helper";

import "./form.scss";

const Form: React.FC = () => {
  useEffect(() => {
    fetchCityes().then((data) => setCityArray(data));
    fetchSpecialty().then((data) => setspecialtyArray(data));
    fetchDoctors().then((data) => setNamesArray(data));
  }, []);

  const [formDate, setFormDate] = useState<FormDate>({
    name: "",
    age: "",
    sex: "",
    city: "",
    specialty: "",
    doctor: "",
    email: "",
    mobileNumber: "",
  });

  const [cityArray, setCityArray] = useState<City[]>([]);
  const [specialtyArray, setspecialtyArray] = useState<Specialty[]>([]);
  const [namesArray, setNamesArray] = useState<Names[]>([]);
  const [errorMessage, setErrorDateMessage] = useState<ErrorMessage>({
    nameError: "",
    ageError: "",
    mobileNumberError: "",
    emailError: "",
    contactsError: "",
  });

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      let errorMessageUpdates: Partial<ErrorMessage> = {};

      switch (name) {
        case "name":
          errorMessageUpdates.nameError = nameValidation(value)
            ? ""
            : "Invalid name";
          break;
        case "age":
          errorMessageUpdates.ageError = birthdayValidation(value)
            ? ""
            : "Invalid date of birth";
          break;
        case "mobileNumber":
          errorMessageUpdates.mobileNumberError = phoneValidation(value)
            ? ""
            : "Invalid phone number";
          break;

        case "doctor":
          const selectedDoctor = namesArray.find(
            (doctor) => doctor.id === value
          );
          if (selectedDoctor) {
            setFormDate((prevFormDate) => ({
              ...prevFormDate,
              city: selectedDoctor.cityId,
              specialty: selectedDoctor.specialityId,
              doctor: value,
            }));
          }
          console.log(formDate);
          break;
        default:
          break;
      }

      setErrorDateMessage((prevMessage: ErrorMessage) => ({
        ...prevMessage,
        ...errorMessageUpdates,
      }));

      setFormDate((prevFormDate) => ({
        ...prevFormDate,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    errorMessage.contactsError =
      !formDate.mobileNumber && !formDate.email
        ? "Please provide a phone number or an email"
        : "";

    setErrorDateMessage((prevMessage) => ({
      ...prevMessage,
      ...errorMessage,
    }));

    isFormValid(errorMessage)
      ? console.log("form ok", formDate)
      : console.log("not OK");
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
            name="name"
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
            name="age"
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
            name="sex"
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
            name="city"
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
            name="specialty"
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
            name="doctor"
            className="form-select"
            value={formDate.doctor}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            {filterDoctorsByAge(namesArray, formDate.age).map((doctor) => (
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
            name="email"
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
            name="mobileNumber"
            className="form-input"
            value={formDate.mobileNumber}
            onChange={handleInputChange}
          />
          {errorMessage.mobileNumberError && (
            <div className="error-message">
              {errorMessage.mobileNumberError}
            </div>
          )}
        </div>
        {errorMessage.contactsError && (
          <div className="error-message">{errorMessage.contactsError}</div>
        )}
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
