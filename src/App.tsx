import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./components/auth/Auth";
import AdminRoute from "./routes/AdminRoute";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import { Box } from "@material-ui/core";

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
						<Auth />
					</Route>
					<Route exact path="/sign-up">
						<Auth />
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
		<SnackbarProvider maxSnack={3} autoHideDuration={1}>
			<App />
		</SnackbarProvider>
	);
}

export default IntegrationNotistack;
