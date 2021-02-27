import { Button, Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import { EmailOutlined, LockOutlined, PersonOutline } from "@material-ui/icons";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { appConfig } from "../../config/Config";
import { theme } from "../../theme/muiTheme";

export default function Register(props: Props) {
	const history = useHistory();
	const [error, setError] = useState<string>("");
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
			confirmPassword: "",
			email: "",
		},
		validationSchema: Yup.object({
			username: Yup.string().required("Required"),
			password: Yup.string().required("Required"),
			confirmPassword: Yup.string().required("Required"),
			email: Yup.string().required("Required").email("Email is invalid!"),
		}),
		onSubmit: async (values) => {
			if (values.password !== values.confirmPassword) {
				formik.setErrors({
					...formik.errors,
					confirmPassword: "Confirm password incorrect!",
				});
			} else {
				axios
					.post(`${appConfig.apiGatewayURL}/register`, { ...values })
					.then((res) => {
						// props.onSignIn();
					})
					.catch((err) => {
						let status = err.response.status;

						if (status === 411) {
							formik.setErrors({ ...formik.errors, username: "Username is exist!" });
						} else if (status === 412) {
							formik.setErrors({ ...formik.errors, email: "Email is exist!" });
						}
					});
			}
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid container direction="column" spacing={2}>
				<Grid item xs>
					<Typography variant="h4" style={{ fontWeight: 600 }}>
						Sign Up
					</Typography>
				</Grid>
				<Grid item xs style={{ marginTop: 8 }}>
					<TextField
						placeholder="Username"
						size="small"
						fullWidth
						variant="outlined"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<PersonOutline color="primary" />
								</InputAdornment>
							),
						}}
						name="username"
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
						type="password"
						variant="outlined"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockOutlined color="primary" />
								</InputAdornment>
							),
						}}
						name="password"
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
					<TextField
						placeholder="Confirm password"
						size="small"
						fullWidth
						variant="outlined"
						type="password"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockOutlined color="primary" />
								</InputAdornment>
							),
						}}
						name="confirmPassword"
						onChange={formik.handleChange}
						error={!!formik.touched.confirmPassword && !!formik.errors.confirmPassword}
						helperText={
							!!formik.touched.confirmPassword && formik.errors.confirmPassword
								? formik.errors.confirmPassword
								: ""
						}
					></TextField>
				</Grid>

				<Grid item xs>
					<TextField
						placeholder="Email"
						size="small"
						fullWidth
						variant="outlined"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<EmailOutlined color="primary" />
								</InputAdornment>
							),
						}}
						name="email"
						onChange={formik.handleChange}
						error={!!formik.touched.email && !!formik.errors.email}
						helperText={
							!!formik.touched.email && formik.errors.email ? formik.errors.email : ""
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
						variant="contained"
						color="primary"
						fullWidth
						type="submit"
						style={{ boxShadow: "unset", marginTop: theme.spacing(1) }}
					>
						Sign Up
					</Button>
				</Grid>

				<Grid item>
					<Typography align="center">
						Already have an account ?{"  "}
						<Typography
							// onClick={props.onSignIn}
							component="span"
							style={{ color: theme.palette.primary.main, cursor: "pointer" }}
						>
							Sign In HERE
						</Typography>
					</Typography>
				</Grid>
			</Grid>
		</form>
	);
}

type Props = {
	// onSignIn(): void;
};
