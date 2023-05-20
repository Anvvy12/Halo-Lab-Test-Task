import React, { useState } from "react";
import "./form.scss";

interface Doctor {
  id: number;
  name: string;
  experience: number;
  specialty: string;
  city: string;
}
// чистити виделкою

const cities = ["City 1", "City 2", "City 3"]; // Список городов

const specialties = ["Specialty 1", "Specialty 2", "Specialty 3"]; // Список специальностей

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Doctor 1",
    experience: 5,
    specialty: "Specialty 1",
    city: "City 1",
  },
  {
    id: 2,
    name: "Doctor 2",
    experience: 8,
    specialty: "Specialty 2",
    city: "City 2",
  },
  {
    id: 3,
    name: "Doctor 3",
    experience: 3,
    specialty: "Specialty 3",
    city: "City 3",
  },
];

// чистити виделкою

const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("");
  // чистити виделкою
  const [city, setCity] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [doctor, setDoctor] = useState("");
  // чистити виделкою
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorDateMessage, setErrorDateMessage] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const regex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    regex.test(inputValue)
      ? setErrorNameMessage("field is not valid")
      : setErrorNameMessage("");

    setName(event.target.value);
  };

  const handleBirthdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    new Date(event.target.value) >= new Date()
      ? setErrorDateMessage("field is not valid")
      : setErrorDateMessage("");
    setBirthday(event.target.value);
  };

  const handleSexChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSex(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
  };

  const handleSpecialtyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSpecialty(event.target.value);
  };

  const handleDoctorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDoctor(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleMobileNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMobileNumber(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Проверка обязательных полей
    if (
      name === "" ||
      birthday === "" ||
      sex === "" ||
      city === "" ||
      doctor === ""
    ) {
      console.log("Please fill in all required fields");
      return;
    }

    // Валидация Email и Mobile Number (хотя бы одно поле должно быть заполнено)
    if (email === "" && mobileNumber === "") {
      console.log("Please provide either Email or Mobile Number");
      return;
    }

    // Дополнительная логика отправки формы...
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
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
            required
          />
          {errorNameMessage && (
            <div className="error-message">{errorNameMessage}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="birthday">
            Birthday Date:
          </label>
          <input
            type="date"
            id="birthday"
            className="form-input"
            value={birthday}
            onChange={handleBirthdayChange}
            required
          />
          {errorDateMessage && (
            <div className="error-message">{errorDateMessage}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="sex">
            Sex:
          </label>
          <select
            id="sex"
            className="form-select"
            value={sex}
            onChange={handleSexChange}
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
            value={city}
            onChange={handleCityChange}
            required
          >
            <option value="">Select</option>
            {cities.map((city) => (
              <option value={city} key={city}>
                {city}
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
            value={specialty}
            onChange={handleSpecialtyChange}
          >
            <option value="">Select</option>
            {specialties.map((specialty) => (
              <option value={specialty} key={specialty}>
                {specialty}
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
            value={doctor}
            onChange={handleDoctorChange}
            required
          >
            <option value="">Select</option>
            {doctors.map((doctor) => (
              <option value={doctor.name} key={doctor.id}>
                {doctor.name} - {doctor.experience} years of experience
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
            value={email}
            onChange={handleEmailChange}
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
            value={mobileNumber}
            onChange={handleMobileNumberChange}
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
