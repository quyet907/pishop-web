import { Container, Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";

export default function AuthWrapper(props: any) {
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
						<Box>{props.children}</Box>
					</Paper>
				</Box>
			</Box>
		</Container>
	);
}


