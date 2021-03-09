import { Avatar, Box, Breadcrumbs, Link } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
	BurstModeRounded,
	DashboardRounded,
	QueueRounded,
	Settings,
	SettingsRounded,
} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ProductList from "./ProductList";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			background: "transparent",
			boxShadow: "unset",
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginRight: 36,
		},
		hide: {
			display: "none",
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: "nowrap",
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: "hidden",
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9) + 1,
			},
		},
		toolbar: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},
		content: {
			flexGrow: 1,
			padding: 64,
		},
	})
);

const list: { icon: JSX.Element; label: string, path: string }[] = [
	{ icon: <DashboardRounded />, label: "Dashboard",path: "/admin/dashboard" },
	{ icon: <QueueRounded />, label: "Product", path: "/admin/product" },
	{ icon: <BurstModeRounded />, label: "Category", path: "/admin/category" },
];

type Props = {
	children?: any;
	title: string;
}

export default function MiniDrawer(props: Props) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const [selectedIndex, setSelectedIndex] = useState<number>(1);
	const history = useHistory();

	const handleListItemClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		index: number
	) => {
		setSelectedIndex(index);
	};

	return (
		<div className={classes.root}>
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					{/* <IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton> */}
					<Box
						style={{
							display: "flex",
							// background: "#eee",
							flex: 1,
							justifyContent: "flex-end",
							alignItems: "center",
						}}
					>
						<IconButton edge="start">
							<SettingsRounded fontSize="small" />
						</IconButton>
						<Box mx={0.5}></Box>
						<Avatar style={{ backgroundColor: "red" }}>A</Avatar>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					{/* <IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton> */}
				</div>
				<Divider />
				<List component="nav">
					{list.map((item, index) => (
						<ListItem
							button
							selected={selectedIndex === index}
							onClick={(event) => {
								handleListItemClick(event, index);
								history.push(item.path);
							}}
							key={item.label}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.label} />
						</ListItem>
					))}
				</List>
				{/* <Divider />
				<List>
					{["All mail", "Trash", "Spam"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List> */}
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />

				<Typography variant="h6">{props.title}</Typography>

				<Box mt={1}>
					<Breadcrumbs separator="›" aria-label="breadcrumb">
						<Link color="inherit" href="/">
							Dashboard
						</Link>
						<Typography color="textPrimary">{props.title}</Typography>
					</Breadcrumbs>
				</Box>
				<Box mt={3}>
					{props.children}
				</Box>
			</main>
		</div>
	);
}
