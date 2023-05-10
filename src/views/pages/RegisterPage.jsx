import React, { useState } from "react";
import "../../styles/pages/registerPage.css";
import { Input, InputPassword } from "../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../../scripts/api/auth";
import { toast } from "react-toastify";
import umnImage from "../../public/images/umn-image.webp";
import umnLogo from "../../public/images/logo-umn.webp";

const LoginPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnChangeName = (event) => {
    setName(event.target.value);
  };

  const handleOnChangeNim = (event) => {
    const { value } = event.target;
    const res = value.slice(0, 11);
    setNim(res);
  };

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleOnChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password tidak sama!");
    } else {
      await userRegister(name, nim, email, password).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <section id="registerPage">
      <section className="registerPage_left">
        <img src={umnImage} alt="Universitas Multimedia Nusantara" height="100%" width="100%" />
      </section>
      <section className="registerPage_right">
        <div className="loginPage_right-logo">
          <img src={umnLogo} alt="Logo UMN" />
        </div>

        <form id="formSection" onSubmit={handleOnSubmit}>
          <Input
            label={"Nama"}
            type={"text"}
            name={"name"}
            placeholder={"ex: John Doe"}
            onChange={handleOnChangeName}
          />
          <Input
            label={"NIM"}
            type={"number"}
            placeholder={"ex: 00123456789"}
            onChange={handleOnChangeNim}
            value={nim}
          />
          <Input
            label={"Email"}
            type={"email"}
            placeholder={"ex: example@student.umn.ac.id"}
            onChange={handleOnChangeEmail}
          />
          <div className="register-password-input">
            <InputPassword
              label={"Kata Sandi"}
              placeholder={""}
              onChange={handleOnChangePassword}
            />
            <InputPassword
              label={"Konfirmasi Kata Sandi"}
              name={"confirm password"}
              onChange={handleOnChangeConfirmPassword}
            />
          </div>

          <div className="form-footer">
            <button type="submit" className="btn-register">
              Register
            </button>
            <p className="form-bottom-text">
              Sudah memiliki akun? <Link to="/">Masuk disini!</Link>
            </p>
          </div>
        </form>
      </section>
    </section>
  );
};

export default LoginPage;
