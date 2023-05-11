import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Main from "./layout/Main";
import { isTokenValid } from "../scripts/api/auth";
import "../styles/components/form.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";

const AppMain = () => {
  const [userAuth, setUserAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const getUserData = async () => {
      setUserAuth(isTokenValid());
      setIsLoading(false);
    };

    getUserData();
  }, [userAuth]);

  // If Data Loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  //   If user not logged in
  if (userAuth === false) {
    return (
      <>
        <Routes>
          <Route path="/*" element={<LoginPage setUserAuth={setUserAuth} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <ToastContainer position={"bottom-left"} autoClose={2000} />
      </>
    );
  }

  //   if user logged in
  return (
    <>
      <Routes>
        <Route path="*" element={<Main setUserAuth={setUserAuth} />} />
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default AppMain;
