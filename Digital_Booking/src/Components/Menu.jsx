import React, { useContext, useState } from "react";
import { ContextLogin } from "../Context/LoginContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Menu = () => {
  const { state, dispatch } = useContext(ContextLogin);

  const { isLogged, isAdmin } = state;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
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
  const reservas = () => {
    navigate("/reservations");
  };
  console.log(isLogged, isAdmin);
  return (
    <div>
      <button className="menu" onClick={toggleMenu}>
        Menú
        {isOpen && (
          <ul>
            {isLogged ? (
              isAdmin ? (
                <>
                  <li onClick={addProduct}>Agregar Producto</li>

                  <li onClick={addCategory}>Agregar Categoría</li>

                  <li onClick={logOut}>Cerrar Sesión</li>
                </>
              ) : (
                <>
                  <li onClick={reservas}>Mis reservas</li>

                  <li onClick={logOut}>Cerrar Sesión</li>
                </>
              )
            ) : (
              <>
                <li onClick={login}>Iniciar Sesión</li>
                <li onClick={register}>Crear Cuenta</li>
              </>
            )}
          </ul>
        )}
      </button>
    </div>
  );
};
export default Menu;

/*import React, { useContext, useState } from "react";
import { ContextLogin } from "../Context/LoginContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Menu = () => {
  const { state, dispatch } = useContext(ContextLogin);

  const { isLogged, isAdmin } = state;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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

  const reservas = () => {
    navigate("/reservations");
  };

  const isUserAdmin = () => {
    return isLogged && isAdmin;
  };

  return (
    <div>
      <button className="menu" onClick={toggleMenu}>
        Menú
        {isOpen && (
          <ul>
            {isLogged ? (
              isUserAdmin() ? (
                <>
                  <li onClick={addProduct}>Agregar Producto</li>
                  <li onClick={addCategory}>Agregar Categoría</li>
                  <li onClick={logOut}>Cerrar Sesión</li>
                </>
              ) : (
                <>
                  <li onClick={reservas}>Mis reservas</li>
                  <li onClick={logOut}>Cerrar Sesión</li>
                </>
              )
            ) : (
              <>
                <li onClick={login}>Iniciar Sesión</li>
                <li onClick={register}>Crear Cuenta</li>
              </>
            )}
          </ul>
        )}
      </button>
    </div>
  );
};

export default Menu;*/
