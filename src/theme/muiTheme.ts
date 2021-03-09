import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#2196f3",
		},
		secondary: {
			main: "#4caf50",
			contrastText: "#fff"
		}
	},
	shape: {
		borderRadius: 5,
	},
	typography: {
		fontFamily: "'Be Vietnam', sans-serif",
		// h6: {
		// 	fontSize:  "1rem"
		// },
		// h5: {
		// 	fontSize:  "1.25rem"
		// },
		// h4: {
		// 	fontSize:  "1.5rem"
		// },
		// h3: {
		// 	fontSize:  "1.75rem"
		// },
		// h2: {
		// 	fontSize:  "2rem"
		// },
		// h1: {
		// 	fontSize:  "2.25rem"
		// },
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
		// MuiInputBase: {
		// 	input: {
		// 		padding: "13px  !important",
		// 	},
		// },
	},
});
