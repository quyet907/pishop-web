import { Box } from "@material-ui/core";
import React from "react";

export default function Dashboard2() {
	return (
		<Box
			style={{
				display: "grid",
				gridTemplateAreas:
					"'menu navbar navbar navbar navbar navbar navbar' 'menu main main main main main main'",
				background: "#eee",
				minHeight: "100vh"
			}}
		>
			<Box style={{ gridArea: "menu", gridAutoColumns: 256 }}>menu</Box>
			<Box style={{ gridArea: "navbar", gridAutoRows: 100 }}>navbar</Box>
			<Box style={{ gridArea: "main" }}>v</Box>
		</Box>
	);
}
