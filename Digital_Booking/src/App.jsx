import React from "react";
import Layout from "./Routes/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { routes } from "./Navigation/Routes";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import ContextLoginProvider from "./Context/LoginContext";
import ContextRegisterProvider from "./Context/RegisterContext";
import AddProduct from "./Routes/AddProduct";
import AddCategory from "./Routes/AddCategory";
import UserList from "./Routes/UserList";
import Products from "./Routes/Products";
import Reservations from "./Routes/Reservations";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<ContextRegisterProvider>
					<ContextLoginProvider>
						<Routes>
							<Route path="/" element={<Navigate to="/home" />} />
							<Route element={<Layout />}>
								{routes.map(({ id, path, Component }) => {
									return <Route key={id} path={path} element={<Component />} />;
								})}
								<Route element={<ProtectedRoutes />}>
									<Route path="/addProduct" element={<AddProduct />} />
									<Route path="/addCategory" element={<AddCategory />} />
									<Route path="/userList" element={<UserList />} />
									<Route path="/products" element={<Products />} />
									<Route path="/reservations" element={<Reservations />} />
								</Route>
							</Route>
						</Routes>
					</ContextLoginProvider>
				</ContextRegisterProvider>
			</BrowserRouter>
		</div>
	)
}

export default App;
