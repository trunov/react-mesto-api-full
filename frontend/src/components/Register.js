import React, { useState } from "react";
import { Link } from "react-router-dom";


const Register = ({ handleRegister, isDataSet }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email) {
      console.log("email не введен");
      return;
    }
    if (!data.password) {
      console.log("пароль не введен");
      return;
    }
    const { email, password } = data;
    handleRegister(password, email);
    if (isDataSet) {
      setData({ email: "", password: "" });
    }
  };

  return (
    <div className="register">
      <h2 className="register__header">Регистрация</h2>

      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__form__input"
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="E-mail"
        />

        <input
          className="register__form__input"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Пароль"
        />

        <button type="submit" className="register__button">
          Зарегистрироваться
        </button>
      </form>

      <p className="register__paragraph">
        Уже зарегистрированы?{" "}
        <Link to="sign-in" className="register__login-link">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Register;
