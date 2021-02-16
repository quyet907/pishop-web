import { Box, Container, makeStyles } from "@material-ui/core";
import React from "react";
import { theme } from "../theme/muiTheme";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: 100,
		marginTop: 100,
	},
}));

export default function Layout(props: any) {
	const classes = useStyles();
	return (
		<div>
			<Container>
				<Box style={{ height: 60 }} display="flex" alignItems="center">
					Header
				</Box>
			</Container>
			<Container className={classes.root}>{props.children}</Container>
		</div>
	);
}
