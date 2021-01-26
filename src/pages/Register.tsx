import { Button, Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import { EmailOutlined, LockOutlined, PersonOutline } from "@material-ui/icons";
import React from "react";

export default function Register() {
	return (
		<Grid container direction="column" spacing={2}>
			<Grid item xs>
				<Typography variant="h5">Sign Up</Typography>
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
				></TextField>
			</Grid>

			<Grid item xs>
				<TextField
					placeholder="Password"
					size="small"
					fullWidth
					variant="outlined"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<LockOutlined color="primary" />
							</InputAdornment>
						),
					}}
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
				></TextField>
			</Grid>

			<Grid item xs>
				<Button
					variant="contained"
					color="primary"
					fullWidth
					style={{ boxShadow: "unset" }}
				>
					Sign Up
				</Button>
			</Grid>
		</Grid>
	);
}
