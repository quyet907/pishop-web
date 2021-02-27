import { CheckCircleOutlineRounded } from "@material-ui/icons";
import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Success from "./Icons/Success";
import AdminRoute from "./pages/admin/AdminRoute";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import LoginNew from "./pages/LoginNew";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import SignUp from "./pages/SignUp";

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
					<ProductDetail></ProductDetail>
				</Route>
				<Route exact path="/cart">
					<Cart />
				</Route>
				<Route exact path="/login">
					<LoginNew />
				</Route>
				<Route exact path="/sign-up">
					<SignUp />
				</Route>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

function IntegrationNotistack() {
	return (
		<SnackbarProvider maxSnack={3} autoHideDuration={1}  >
			<App />
		</SnackbarProvider>
	);
}

export default IntegrationNotistack;
