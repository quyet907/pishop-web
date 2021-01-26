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
		fontFamily: ["Nunito", "sans-serif"].join(","),
		h5: {
			fontWeight: 700,
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
				padding: "13px 5px !important"
			}
		}
	},
});
