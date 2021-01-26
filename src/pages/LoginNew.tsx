import { Container, Paper, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import Login from "./Login";
import Register from "./Register";

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={1} pt={3}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
}));

export default function LoginNew() {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};

	return (
		<Container maxWidth={false} disableGutters>
			<Box height="100vh" display="flex" justifyContent="center" alignItems="center">
				<Box width={500}>
					<Paper
						style={{
							padding: 32,
							boxShadow: "-11px 11px 27px #d9d9d9,20px -20px 60px #ffffff",
						}}
					>
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="fullWidth"
							aria-label="full width tabs example"
						>
							<Tab label="Item One">
                                <Typography>heelo</Typography>
                            </Tab>
							<Tab label="Item Two" />
						</Tabs>
						<SwipeableViews
							axis={theme.direction === "rtl" ? "x-reverse" : "x"}
							index={value}
							onChangeIndex={handleChangeIndex}
						>
							<TabPanel value={value} index={0} dir={theme.direction}>
								<Login />
							</TabPanel>
							<TabPanel value={value} index={1} dir={theme.direction}>
								<Register />
							</TabPanel>
						</SwipeableViews>
					</Paper>
				</Box>
			</Box>
		</Container>
	);
}
