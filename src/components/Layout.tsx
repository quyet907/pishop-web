import {
	Avatar,
	Badge,
	Box,
	Button,
	ClickAwayListener,
	Container,
	Divider,
	Grow,
	IconButton,
	InputAdornment,
	makeStyles,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	TextField,
	Typography,
} from "@material-ui/core";
import { ExpandMore, SearchRounded, ShoppingCartOutlined } from "@material-ui/icons";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import * as Icons from "react-feather";
import { NavLink, useHistory } from "react-router-dom";
import { theme } from "../theme/muiTheme";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: 100,
	},
	link: {
		fontWeight: 500,
		fontSize: "0.9rem",
		color: theme.palette.text.secondary,
		textDecoration: "none",
		"&:hover": {
			color: theme.palette.primary.main,
		},
	},
	mr: {
		marginRight: theme.spacing(2),
	},
	labelButton: {
		fontWeight: 500,
		fontSize: "0.9rem",
		textTransform: "initial",
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.standard,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	hint: {
		marginRight: "1rem",
		color: theme.palette.text.secondary,
	},
}));

export default function Layout(props: any) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef<HTMLButtonElement>(null);
	const history = useHistory();
	const [user, setUser] = useState<{ username: string; password: string }>({
		username: "",
		password: "",
	});

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current!.focus();
		}

		prevOpen.current = open;
	}, [open]);

	useEffect(() => {
		const json = localStorage.getItem("user");
		if (json) {
			const user = JSON.parse(json);
			setUser({ ...user, username: user.username });
		}
	}, []);

	return (
		<Box>
			<Box style={{ position: "sticky", top: 0, zIndex: 2, backgroundColor: "white" }}>
				<Box style={{ borderBottom: "1px solid #eee" }}>
					<Container>
						<Box
							style={{ height: 40 }}
							display="flex"
							alignItems="center"
							justifyContent="space-between"
						>
							<Box
								style={{
									display: "flex",
									flexBasis: (17 + 5) * 4,
									justifyContent: "space-between",
								}}
							>
								<Icons.Facebook size={17} color={theme.palette.grey[500]} />
								<Icons.Twitter size={17} color={theme.palette.grey[500]} />
								<Icons.Youtube size={17} color={theme.palette.grey[500]} />
								<Icons.Instagram size={17} color={theme.palette.grey[500]} />
							</Box>
							<Box style={{ display: "flex", alignItems: "center", height: "100%" }}>
								{!user.username ? (
									<>
										<NavLink
											to="/sign-up"
											className={clsx(classes.link, classes.mr)}
										>
											Sign Up
										</NavLink>
										<NavLink
											to="/login"
											className={clsx(classes.link, classes.mr)}
										>
											Sign In
										</NavLink>
									</>
								) : (
									<>
										<Button
											ref={anchorRef}
											aria-controls={open ? "menu-list-grow" : undefined}
											aria-haspopup="true"
											classes={{ label: classes.labelButton }}
											onClick={handleToggle}
											startIcon={
												<Avatar
													style={{
														width: 24,
														height: 24,
														marginRight: theme.spacing(1),
													}}
												></Avatar>
											}
											endIcon={
												<ExpandMore
													className={clsx(classes.expand, {
														[classes.expandOpen]: open,
													})}
												/>
											}
										>
											{user.username}
										</Button>
										<Popper
											open={open}
											anchorEl={anchorRef.current}
											role={undefined}
											transition
											placement="bottom-end"
											disablePortal
											style={{ background: "white", zIndex: 3 }}
										>
											{({ TransitionProps, placement }) => (
												<Grow
													{...TransitionProps}
													style={{
														transformOrigin:
															placement === "bottom"
																? "right top"
																: "right bottom",
													}}
												>
													<Paper>
														<ClickAwayListener
															onClickAway={handleClose}
														>
															<MenuList
																autoFocusItem={open}
																id="menu-list-grow"
																onKeyDown={handleListKeyDown}
																disablePadding
															>
																<MenuItem onClick={handleClose}>
																	Profile
																</MenuItem>
																<MenuItem onClick={handleClose}>
																	My account
																</MenuItem>
																<Divider />
																<MenuItem
																	onClick={(e) => {
																		handleClose(e);
																		localStorage.removeItem(
																			"user"
																		);
																		window.location.reload();
																	}}
																>
																	Logout
																</MenuItem>
															</MenuList>
														</ClickAwayListener>
													</Paper>
												</Grow>
											)}
										</Popper>
									</>
								)}
							</Box>
						</Box>
					</Container>
				</Box>
				<Box py={3}>
					<Container>
						<Box
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Box
								flexBasis={150}
								onClick={() => history.push("/")}
								style={{ cursor: "pointer" }}
							>
								<img
									src="https://i0.wp.com/www.ecommerce-nation.com/wp-content/uploads/2018/01/dotSTORE.png?fit=842%2C289&ssl=1"
									alt="logo"
									width="100%"
								/>
							</Box>
							<Box mx={3} flex={1}>
								<TextField
									fullWidth
									placeholder="Search..."
									variant="outlined"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SearchRounded color="disabled" />
											</InputAdornment>
										),
									}}
									inputProps={{ style: { padding: 14 } }}
								></TextField>
							</Box>
							<Box display="flex" justifyContent="center" flexBasis={100}>
								<Box>
									<IconButton aria-label="cart">
										<Badge badgeContent={props.cartLength} color="secondary">
											<ShoppingCartOutlined />
										</Badge>
									</IconButton>
								</Box>

								<Box>
									{/* <Box
									onClick={(e) => {
										e.preventDefault();
									}}
								>
									<Typography variant="h6" color="textSecondary">
										Hi, Quyet!
									</Typography>
									<Button
										ref={anchorRef}
										aria-controls={open ? "menu-list-grow" : undefined}
										aria-haspopup="true"
										endIcon={<ExpandMore />}
										size="small"
										style={{
											padding: "0px !important",
											fontSize: "0.875rem",
											backgroundColor: "transparent !important",
										}}
										disableTouchRipple
									>
										My account
									</Button>
								</Box> */}
								</Box>
							</Box>
						</Box>
						<Box>
							<Box mt={0.25} ml={"174px"}>
								<Typography variant="caption" className={classes.hint}>
									iPhone 12 128GB
								</Typography>
								<Typography variant="caption" className={classes.hint}>
									iPhone XR
								</Typography>
								<Typography variant="caption" className={classes.hint}>
									iPhone SE 2020
								</Typography>
								<Typography variant="caption" className={classes.hint}>
									Oppo A71
								</Typography>
								<Typography variant="caption" className={classes.hint}>
									Redmi Note 9 Pro
								</Typography>
								<Typography variant="caption" className={classes.hint}>
									Nokia 8
								</Typography>
							</Box>
						</Box>
					</Container>
				</Box>
			</Box>

			<Container className={classes.root}>{props.children}</Container>
		</Box>
	);
}
