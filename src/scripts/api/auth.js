import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

// const BASE_URL = "http://localhost:8000/api/auth";
const BASE_URL = "https://forum-diskusiback-end-production.up.railway.app/api/auth";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const putAccessToken = (accessToken) => {
  return localStorage.setItem("accessToken", accessToken);
};

const removeAccessToken = () => {
  return localStorage.removeItem("accessToken");
};

const getDataFromToken = () => {
  const token = jwtDecode(getAccessToken());

  return token;
};

const isTokenValid = () => {
  const token = getAccessToken();

  if (token) {
    const tokenExp = jwtDecode(token).exp;
    const expirationTime = tokenExp * 1000 - 60000;

    if (Date.now() >= expirationTime) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

const userLogin = async (email, password) => {
  try {
    const res = await axios
      .post(`${BASE_URL}/login`, {
        user_email: email,
        user_password: password,
      })
      .then((data) => {
        putAccessToken(data.data.token);
        return true;
      })
      .catch(() => {
        return false;
      });

    return res;
  } catch (error) {
    console.log(error);
  }
};

const userRegister = async (name, nim, email, password) => {
  try {
    await axios
      .post(`${BASE_URL}/register`, {
        user_name: name,
        user_nim: nim,
        user_email: email,
        user_password: password,
      })
      .then(() => {
        toast.success("Registrasi berhasil!");
      })
      .catch(() => {
        toast.error("Registrasi gagal!");
      });
  } catch (error) {
    console.log(error);
  }
};

export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  getDataFromToken,
  userLogin,
  userRegister,
  isTokenValid,
};
