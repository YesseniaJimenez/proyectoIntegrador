import Login from "../Routes/Login";
import Home from "../Routes/Home";
import Detail from "../Routes/Detail";
import Layout from "../Routes/Layout";
import AddProduct from "../Routes/AddProduct";
import Register from "../Routes/Register";
import AddCategory from "../Routes/AddCategory";
import UserList from "../Routes/UserList";
import Profile from "../Routes/Profile";
import ReservationRequest from "../Routes/ReservationRequest";
import { Component } from "react";

export const routes = [
  {
    id: 1,
    path: "/home",
    Component: Home,
  },
  {
    id: 2,
    path: "/detail/:id",
    Component: Detail,
  },
  {
    id: 3,
    path: "/register",
    Component: Register,
  },
  {
    id: 4,
    path: "/login",
    Component: Login,
  },
  {
    id: 5,
    path: "/profile",
    Component: Profile,
  },
  {
    id: 6,
    path: "/reserve/:id",
    Component: ReservationRequest,
  },
];

export { Layout };
