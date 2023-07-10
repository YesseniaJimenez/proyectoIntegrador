import React, { createContext, useReducer } from "react";

export const ContextLogin = createContext({});

const handleDispatch = (state, action) => {
  switch (action.type) {
    case "LOGGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      sessionStorage.setItem("token", JSON.stringify("SGJASLFJAS1234"));
      sessionStorage.setItem("isAdmin", JSON.stringify(action.isAdmin));
      return {
        ...state,
        user: action.payload,
        isLogged: true,
        isAdmin: action.isAdmin,
      };

    case "LOGOUT":
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("isAdmin");
      return {
        ...state,
        user: null,
        isLogged: false,
        isAdmin: false,
      };

    default:
      return state;
  }
};

const ContextLoginProvider = ({ children }) => {
  const initialIsAdmin = sessionStorage.getItem("isAdmin");
  const isAdmin = initialIsAdmin === "true";

  const initialState = {
    isLogged: !!sessionStorage.getItem("token"),
    isAdmin: isAdmin,
    user: JSON.parse(localStorage.getItem("user")) || null,
  };

  const [state, dispatch] = useReducer(handleDispatch, initialState);

  const propiedades = {
    state,
    dispatch,
  };

  return (
    <ContextLogin.Provider value={propiedades}>
      {children}
    </ContextLogin.Provider>
  );
};

export default ContextLoginProvider;
