import React from "react";
import { useState, useContext } from "react";
import { ContextLogin } from "../Context/LoginContext";
import { useNavigate, Link } from "react-router-dom";
import axios, { Axios } from "axios";

const Login = () => {
  const { dispatch } = useContext(ContextLogin);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:8080/admin/manage/users/all")
      .then(({ data }) => {
        const users = data;

        const user = users.find((user) => user.email === values.email);

        if (user) {
          const isAdmin = user.role === "ADMIN" ? true : false;
          
          dispatch({ type: "LOGGIN", payload: user, isAdmin});
          navigate("/home");
          console.log("Inicio de sesion correcto");
        } else {
          console.log("credenciales incorrectas");
        }
      })
      .catch((error) => {
        console.log("Error al obtener la lista de usuarios");
        console.error(error);
      });
  };

  return (
    <div className="main-login">
      <h1>Iniciar sesión</h1>

      <div>
        <form onSubmit={handleSubmit} className="form-login">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Correo electrónico"
            value={values.email}
            onChange={(e) => {
              setValues({ ...values, email: e.target.value });
            }}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            value={values.password}
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
            }}
          />
          <Link to="/register" className="link-login">
            No tienes una cuenta? Registrate
          </Link>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
