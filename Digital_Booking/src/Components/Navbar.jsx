import React, { useContext } from "react";
import { ContextLogin } from "../Context/LoginContext";
import logo from "../assets/images/logo1.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import { ContextRegister } from "../Context/RegisterContext";
import Menu from "./Menu";

const Navbar = () => {
  const { state, dispatch } = useContext(ContextLogin);

  const location = useLocation();

  const navigate = useNavigate();

  const showButtons =
    !state.isLogged &&
    !["/login", "/register", "/addProduct", "/addCategory"].includes(
      location.pathname
    );

  const displayAddProductButton = ["/addProduct"].includes(location.pathname);

  const displayAddCategoryButton = ["/addCategory"].includes(location.pathname);

  const register = () => {
    navigate("/register");
  };

  const login = () => {
    navigate("/login");
  };

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/home");
  };

  const addCategory = () => {
    navigate("/addCategory");
  };

  const addProduct = () => {
    navigate("/addProduct");
  };

  const [clickLogo, setClickLogo] = useState(false);

  const openMenu = () => {
    setClickLogo(!clickLogo);
  };

  return (
    <header className="header">
      <nav className="navBar">
        <Menu />
        <Link className="link-logo" to="/home">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <p className="parrafo-header">Lleva la musica con vos</p>

        <span className="material-symbols-outlined" onClick={openMenu}></span>
      </nav>
    </header>
  );
};

export default Navbar;
