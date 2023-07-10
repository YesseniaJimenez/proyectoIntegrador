import React, { useReducer } from "react";
import { createContext } from "react";

export const ContextRegister = createContext({})

const handleDispatch = (state, { type }) => {

    switch (type) {
        case "USER":
            sessionStorage.setItem("tokenUser", JSON.stringify("userASDFHAJKSF1234"))
            sessionStorage.setItem("user", true)
            return {
                ...state,
                isLogged: true,
                isUser: true,
                isAdmin: false
            }

        case "ADMIN":
            sessionStorage.setItem("tokenAdmin", JSON.stringify("admin1321432342"))
            sessionStorage.setItem("admin", true)
            return {
                ...state,
                isLogged: true,
                isUser: false,
                isAdmin: true
            }
        default:
            state;
    }
}

const ContextRegisterProvider = ({ children }) => {

    const initialState = {
        isLogged: !!sessionStorage.getItem("token"),
        isUser: !!sessionStorage.getItem("token"),
        isAdmin: !!sessionStorage.getItem("token")
    }

    const [ state, dispatch ] = useReducer(handleDispatch, initialState)

    const propiedades = {
        state,
        dispatch
    }


    return (
        <ContextRegister.Provider value={propiedades}>
            {children}
        </ContextRegister.Provider>
    )

}

export default ContextRegisterProvider