import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminRoute from "./pages/admin/AdminRoute";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import LoginNew from "./pages/LoginNew";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/admin">
					<AdminRoute />
				</Route>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/product/:productId">
					<ProductDetail ></ProductDetail>
				</Route>
				<Route exact path="/cart">
					<Cart />
				</Route>
				<Route exact path="/login">
					<LoginNew />
				</Route>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
