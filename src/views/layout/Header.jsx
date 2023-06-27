import React, { useEffect, useState } from "react";
import "../../styles/layout/header.css";
import HeaderDropdown from "../components/HeaderDropdown";
import { getUserProfile } from "../../scripts/api/users";
import fetchProfileImage from "../../scripts/fetchProfileImage";
import avatar from "../../public/images/avatar.webp";
import { BsFillBellFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = ({ setUserAuth, userProfileImage, setNotifications, notifications }) => {
  const [username, setUsername] = useState();
  const [userNim, setUserNim] = useState();
  const [userRole, setUserRole] = useState();
  const [userImageUrl, setUserImageUrl] = useState();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const user = await getUserProfile();

      const name = user.user_name;
      const firstName = name.split(" ")[0];

      setUsername(firstName);
      setUserNim(user.user_nim);
      setUserRole(user.id_role);
      setUserImageUrl(await fetchProfileImage(userProfileImage));

      const notification = await notifications;
      setNotificationCount(notification.length);
    };

    getData();
  }, [notifications, userProfileImage]);

  return (
    <header id="header">
      <section className="header_left">
        <strong>Forum Diskusi</strong>
      </section>
      <section className="header_right">
        <div className="header-user">
          <p>
            {username} ({userNim})
          </p>
          <div className="header-avatar">
            <img src={userImageUrl || avatar} alt={`${username} Avatar`} />
          </div>
        </div>
        <div>
          <Link
            to="/notification"
            className="btn-notification"
            notification-count={notificationCount}
          >
            <BsFillBellFill />
          </Link>
        </div>
        <HeaderDropdown
          setUserAuth={setUserAuth}
          username={username}
          nim={userNim}
          role={userRole}
        />
      </section>
    </header>
  );
};

export default Header;
