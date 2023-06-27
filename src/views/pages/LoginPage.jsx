import React, { useState } from "react";
import "../../styles/pages/loginPage.css";
import { Input, InputPassword } from "../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import umnImage from "../../public/images/umn-image.webp";
import { userLogin } from "../../scripts/api/auth";
import { toast } from "react-toastify";
import umnLogo from "../../public/images/logo-umn.webp";
import { Modal } from "react-bootstrap";

const LoginPage = ({ setUserAuth }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

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

      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        className="case-of-conduct"
        centered
      >
        <Modal.Header>
          <Modal.Title>Peraturan Website!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            <li>
              Pengguna diperkenankan untuk membuat diskusi baru hanya untuk membahas mengenai mata
              kuliah dan tidak untuk kepentingan lainnya!
            </li>
            <li>Pengguna dilarang untuk memberikan jawaban atau contekan dalam jenis apa pun!</li>
            <li>
              Pengguna dilarang untuk posting apa pun yang bersifat pornografi, rasis, ataupun
              yang tidak berhubungan dengan mata kuliah di Universitas Multimedia Nusantara!
            </li>
            <li> Pengguna wajib untuk saling menghormati antara satu sama yang lain!</li>
          </ol>
          <button onClick={handleClose} className="btn-case-of-conduct">
            Saya mengerti dan akan mematuhinya
          </button>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default LoginPage;
