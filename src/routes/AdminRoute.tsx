import { Container, Typography } from "@material-ui/core";
import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Login from "../components/auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import Dashboard2 from "../pages/admin/Dashboard2";

export default function AdminRoute() {
	const { path, url } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${path}/login`}>
				<Login />
			</Route>
			<Route exact path={`${path}/dashboard`}>
				<Dashboard />
			</Route>
			<Route exact path={`${path}/product`}>
				<Dashboard />
			</Route>
			<Route exact path={`${path}/category`}>
				<Dashboard />
			</Route>
			<Route exact path={`${path}`}>
				<Redirect to={`${path}/dashboard`} />
			</Route>
		</Switch>
	);
}
