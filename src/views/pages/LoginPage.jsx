import React, { useState } from "react";
import "../../styles/pages/loginPage.css";
import { Input, InputPassword } from "../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import umnImage from "../../public/images/umn-image.webp";
import { userLogin } from "../../scripts/api/auth";
import { toast } from "react-toastify";
import umnLogo from "../../public/images/logo-umn.webp";

const LoginPage = ({ setUserAuth }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    await userLogin(email, password).then((data) => {
      if (data === false) {
        toast.error("Email/Password invalid!");
      } else {
        setUserAuth(data);
        navigate("/home");
      }
    });
  };

  return (
    <section id="loginPage">
      <section className="loginPage_left">
        <img src={umnImage} alt="Universitas Multimedia Nusantara" height="100%" width="100%" />
      </section>
      <section className="loginPage_right">
        <div className="loginPage_right-logo">
          <img src={umnLogo} alt="Logo UMN" />
        </div>

        {/* Pindah dibawah dan diatas logo */}
        <form id="formSection" onSubmit={handleOnSubmit}>
          <Input
            label={"Email"}
            type={"text"}
            name={"email"}
            placeholder={"example@student.umn.ac.id"}
            onChange={handleOnChangeEmail}
          />
          <InputPassword
            label={"Password"}
            type={"password"}
            name={"password"}
            placeholder={""}
            onChange={handleOnChangePassword}
          />
          <div className="form-footer">
            <button type="submit" className="btn-login">
              Masuk
            </button>
            <p className="form-bottom-text">
              Belum punya akun? <Link to="/register">Registrasi disini!</Link>
            </p>
          </div>
        </form>
      </section>
    </section>
  );
};

export default LoginPage;
