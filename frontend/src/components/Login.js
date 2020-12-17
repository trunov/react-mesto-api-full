import React, { useState } from "react";

const Login = ({ handleLogin }) => {
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
    const { email, password } = data;
    handleLogin(email, password);
  };

  return (
    <div onSubmit={handleSubmit} className="login">
      <h2 className="login__header">Вход</h2>
      <form className="login__form">
        <input
          className="login__form__input"
          id="email"
          required
          name="email"
          type="text"
          value={data.email}
          onChange={handleChange}
          placeholder="E-mail"
        />

        <input
          className="login__form__input"
          id="password"
          required
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Пароль"
        />

        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
