import { Box } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import AdminRoute from "./routes/AdminRoute";

function App() {
	return (
		<Box style={{ minWidth: "100vh", minHeight: "100vh" }}>
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
						<Login />
					</Route>
					<Route exact path="/sign-up">
						<Register />
					</Route>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</BrowserRouter>
		</Box>
	);
}

function IntegrationNotistack() {
	return (
		<SnackbarProvider maxSnack={3} autoHideDuration={3000}>
			<App />
		</SnackbarProvider>
	);
}

export default IntegrationNotistack;
