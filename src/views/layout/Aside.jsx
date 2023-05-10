import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/layout/aside.css";

const Aside = ({ userRole }) => {
  return (
    <aside id="aside">
      <section className="aside_main">
        <NavLink to="/home">Mata Kuliah Anda</NavLink>
        <NavLink to="/mata-kuliah-list">Daftar Mata Kuliah</NavLink>
        {userRole === 1 && <NavLink to="/admin-manager">Admin Manager</NavLink>}
      </section>
    </aside>
  );
};

export default Aside;
