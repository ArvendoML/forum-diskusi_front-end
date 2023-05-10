import React, { useEffect, useState } from "react";
import "../../styles/layout/header.css";
import HeaderDropdown from "../components/HeaderDropdown";
import { getUserProfile } from "../../scripts/api/users";
import fetchProfileImage from "../../scripts/fetchProfileImage";

const Header = ({ setUserAuth, userProfileImage }) => {
  const [username, setUsername] = useState();
  const [userNim, setUserNim] = useState();
  const [userRole, setUserRole] = useState();
  const [userImageUrl, setUserImageUrl] = useState();

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserProfile();

      const name = user.user_name;
      const firstName = name.split(" ")[0];

      setUsername(firstName);
      setUserNim(user.user_nim);
      setUserRole(user.id_role);
      setUserImageUrl(await fetchProfileImage(userProfileImage));
    };

    getUser();
  }, [userProfileImage]);

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
            <img src={userImageUrl} alt={`${username} Avatar`} />
          </div>
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
