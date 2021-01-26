import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import { LockOutlined, PersonOutline } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { API } from "../config/Config";
import { theme } from "../theme/muiTheme";

export default function Login() {
	

	return (
		<Grid container direction="column" spacing={2}>
			<Grid item xs>
				<Typography variant="h5">Sign In</Typography>
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
				<Button
					variant="contained"
					color="primary"
					fullWidth
					style={{ boxShadow: "unset" }}
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
						startIcon={<FcGoogle />}
					>
						Google
					</Button>
				</Box>

				<Box flex={1}>
					<Button
						style={{ background: "#00000005", boxShadow: "unset" }}
						fullWidth
						startIcon={
							<FaFacebookSquare style={{ color: theme.palette.primary.dark }} />
						}
					>
						Facebook
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
}
