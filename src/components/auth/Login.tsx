import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import { LockOutlined, PersonOutline } from "@material-ui/icons";
import axios from "axios";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { appConfig } from "../../config/Config";
import { theme } from "../../theme/muiTheme";
import AuthWrapper from "./AuthWrapper";

const validate = (values: any) => {
	const errors: any = {};
	if (!values.username) {
		errors.username = "Required";
	}

	if (!values.password) {
		errors.password = "Required";
	}

	return errors;
};

export default function Login(props: Props) {
	const history = useHistory();
	const [error, setError] = useState<string>("");
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { url, path } = useRouteMatch();

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validate,
		onSubmit: (values, { setSubmitting }) => {
			setSubmitting(true);
			const url = path.includes("admin")
				? `${appConfig.apiGatewayURL}/admin/login`
				: `${appConfig.apiGatewayURL}/login`;
			axios
				.post(url, { ...values })
				.then((res) => {
					localStorage.setItem("user", JSON.stringify({ ...values }));
					path.includes("admin") ? history.push(`/admin/product`) : history.push(`/`);
				})
				.catch((err) => {
					setError(err.response.data.message);
				})
				.finally(() => setSubmitting(false));
		},
	});

	useEffect(() => {
		const json = localStorage.getItem("user");
		if (!path.includes("admin") && json) {
			history.push("/");
		}
	}, []);

	return (
		<AuthWrapper>
			<form onSubmit={formik.handleSubmit}>
				<Grid container direction="column" spacing={2}>
					<Grid item xs>
						<Typography variant="h4" style={{ fontWeight: 600 }}>
							Sign In
						</Typography>
					</Grid>
					<Grid item xs style={{ marginTop: 8 }}>
						<TextField
							placeholder="Username"
							size="small"
							fullWidth
							variant="outlined"
							name="username"
							value={formik.values.username}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PersonOutline color="primary" />
									</InputAdornment>
								),
							}}
							onChange={formik.handleChange}
							error={!!formik.touched.username && !!formik.errors.username}
							helperText={
								!!formik.touched.username && formik.errors.username
									? formik.errors.username
									: ""
							}
						></TextField>
					</Grid>

					<Grid item xs>
						<TextField
							placeholder="Password"
							size="small"
							fullWidth
							variant="outlined"
							name="password"
							type="password"
							value={formik.values.password}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockOutlined color="primary" />
									</InputAdornment>
								),
							}}
							onChange={formik.handleChange}
							error={!!formik.touched.password && !!formik.errors.password}
							helperText={
								!!formik.touched.password && formik.errors.password
									? formik.errors.password
									: ""
							}
						></TextField>
					</Grid>

					<Grid item xs>
						<Typography variant="caption" color="error">
							{error}
						</Typography>
					</Grid>

					<Grid item xs>
						<Button
							disabled={formik.isSubmitting}
							variant="contained"
							color="primary"
							type={"submit"}
							fullWidth
							style={{ boxShadow: "unset", marginTop: theme.spacing(1) }}
						>
							Sign In
						</Button>
					</Grid>
					<Grid item xs>
						<Typography align="center">or sign in with</Typography>
					</Grid>

					<Grid item container>
						<Box mr={2} flex={1}>
							<Button
								style={{ background: "#00000005", boxShadow: "unset" }}
								fullWidth
								// startIcon={<FcGoogle />}
							>
								Google
							</Button>
						</Box>

						<Box flex={1}>
							<Button
								style={{ background: "#00000005", boxShadow: "unset" }}
								fullWidth
								// startIcon={
								// <FaFacebookSquare style={{ color: theme.palette.primary.dark }} />
								// }
							>
								Facebook
							</Button>
						</Box>
					</Grid>
					<Grid item>
						<Typography align="center">
							Don't have an account ?{"  "}
							<Typography
								onClick={() => history.push("/sign-up")}
								component="span"
								style={{ color: theme.palette.primary.main, cursor: "pointer" }}
							>
								Sign up NOW
							</Typography>
						</Typography>
					</Grid>
				</Grid>
			</form>
		</AuthWrapper>
	);
}

type Props = {
	// onSignUp?(user: UserLogin): void;
};

interface UserLogin {
	username: string;
	password: string;
}
