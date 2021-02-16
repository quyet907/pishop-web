import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#2196f3",
		},
	},
	shape: {
		borderRadius: 7,
	},
	typography: {
		fontFamily: "Ubuntu",
		h6: {
			fontWeight: 700,
			fontSize:  "1rem"
		},
		h5: {
			fontWeight: 700,
			fontSize:  "1.25rem"
		},
		h4: {
			fontWeight: 500,
			fontSize:  "1.5rem"
		},
		h3: {
			fontWeight: 700,
			fontSize:  "1.75rem"
		},
		h2: {
			fontWeight: 700,
			fontSize:  "2rem"
		},
		h1: {
			fontWeight: 700,
			fontSize:  "2.25rem"
		},
	},
	overrides: {
		MuiButton: {
			root: {
				padding: "10.5px 16px !important",
			},
			label: {
				fontWeight: "bold",
			},
		},
		MuiInputBase: {
			input: {
				padding: "13px 5px !important",
			},
		},
	},
});
