import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../../styles/components/dropdown.css";
import { removeAccessToken } from "../../scripts/api/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";

const HeaderDropdown = ({ setUserAuth, username, nim, role }) => {
  const navigate = useNavigate();

  const handleOnClickLogout = () => {
    removeAccessToken();
    setUserAuth(null);
    navigate("/");
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="transparent" id="dropdown-basic" />

      <Dropdown.Menu>
        <section id="dropdownMobile">
          <div className="dropdownMobile-component">
            <p>{username}</p>
            <p>{nim}</p>
          </div>
          <hr />
          <div className="dropdownMobile-nav">
            <NavLink to="/home">Mata Kuliah Anda</NavLink>
            <NavLink to="/mata-kuliah-list">Daftar Mata Kuliah</NavLink>
            {role === 1 && <NavLink to="/admin-manager">Admin Manager</NavLink>}
          </div>
          <hr />
        </section>
        <Dropdown.Item onClick={() => navigate("/profile")} className="dropdown-item-logout">
          Profile
        </Dropdown.Item>
        <Dropdown.Item onClick={handleOnClickLogout} className="dropdown-item-logout">
          <GrLogout />
          Keluar
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default HeaderDropdown;
