import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import AuthWrapper from "../components/auth/AuthWrapper";
import Login from "../components/auth/Login";
import CategoryTable from "../pages/admin/CategoryTable";
import Dashboard from "../pages/admin/Dashboard";
import ProductTable2 from "../pages/admin/ProductTable2";

export default function AdminRoute() {
	const { path, url } = useRouteMatch();

	return (
		<div >
			<Switch>
				<Route exact path={`${path}/login`}>
					<Login />
				</Route>
				<Route exact path={`${path}/dashboard`}>
					<Dashboard title="Dashboard" />
				</Route>
				<Route exact path={`${path}/product`}>
					<Dashboard title="Product">
						<ProductTable2 />
					</Dashboard>
				</Route>
				<Route exact path={`${path}/category`}>
					<Dashboard title="Category">
						<CategoryTable />
					</Dashboard>
				</Route>
				<Route exact path={`${path}`}>
					<Redirect to={`${path}/product`} />
				</Route>
			</Switch>
		</div>
	);
}
