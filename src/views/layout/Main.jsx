import React from "react";
import { Route, Routes } from "react-router-dom";
import "../../styles/layout/main.css";
import Header from "./Header";
import Aside from "./Aside";
import UserMatkulPage from "../pages/UserMatkulPage";
import MatkulListPage from "../pages/MatkulListPage";
import MatkulDiskusiListPage from "../pages/MatkulDiskusiListPage";
import MatkulDiskusiDetailPage from "../pages/MatkulDiskusiDetailPage";
import ProfilePage from "../pages/ProfilePage";
import { useState } from "react";
import { useEffect } from "react";
import { UserProfileProvider } from "../../context/userProfile.context";
import AdminManager from "../pages/AdminManager";
import { getUserProfile } from "../../scripts/api/users";
import NotificationPage from "../pages/NotificationPage";
import { getUserNotifications } from "../../scripts/api/notifications";

const Main = ({ setUserAuth }) => {
  const [userProfile, setUserProfile] = useState();
  const [userProfileImage, setUserProfileImage] = useState();
  const [userRole, setUserRole] = useState();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const profile = await getUserProfile();
      setUserRole(profile.id_role);
      setUserProfile(profile);
      setUserProfileImage(profile.user_imageUrl);

      const notifications = await getUserNotifications(profile.id);
      setNotifications(notifications);
    };
    getData();
  }, []);

  return (
    <UserProfileProvider value={{ userProfile, setUserProfile }}>
      <main>
        <Header
          setUserAuth={setUserAuth}
          userProfileImage={userProfileImage}
          setNotifications={setNotifications}
          notifications={notifications}
        />
        <section id="mainContent">
          <Aside userRole={userRole} />
          <Routes>
            <Route path="/home" element={<UserMatkulPage />} />
            <Route path="/mata-kuliah-list" element={<MatkulListPage />} />
            <Route path="/forum/:id_matkul" element={<MatkulDiskusiListPage />} />
            <Route
              path="/forum/:id_matkul/diskusi/:id_discussion"
              element={<MatkulDiskusiDetailPage />}
            />
            <Route path="/admin-manager" element={<AdminManager />} />
            <Route
              path="/notification"
              element={
                <NotificationPage
                  notifications={notifications}
                  setNotifications={setNotifications}
                />
              }
            />
            <Route
              path="/profile"
              element={<ProfilePage setUserProfileImage={setUserProfileImage} />}
            />
          </Routes>
        </section>
      </main>
    </UserProfileProvider>
  );
};

export default Main;
