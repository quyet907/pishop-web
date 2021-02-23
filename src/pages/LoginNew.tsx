import { Container, Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
}));

export default function LoginNew() {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const [formSignUp, setFormSignUp] = useState(false);

	

	return (
		<Container maxWidth={false} disableGutters>
			<Box height="100vh" display="flex" justifyContent="center" alignItems="center">
				<Box width={500}>
					<Paper
						style={{
							padding: 32,
							boxShadow: "-11px 11px 27px #d9d9d9,20px -20px 60px #ffffff",
							minHeight: 360,
						}}
					>
						<Box>
							{!formSignUp ? (
								<Login onSignUp={() => setFormSignUp(true)} />
							) : (
								<Register onSignIn={() => setFormSignUp(false)} />
							)}
						</Box>
					</Paper>
				</Box>
			</Box>
		</Container>
	);
}
