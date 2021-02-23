import { Checkbox, ListItemIcon, ListSubheader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper,
		},
		muiListItemRoot: {
			borderRadius: 5,
		},
		muiListItemSelected: {
			color: theme.palette.primary.main,
			backgroundColor: "transparent !important",
		},
		selectedText: {
			"& span": {
				fontWeight: 600,
			},
		},
	})
);

export default function ListCommon2() {
	const classes = useStyles();
	const [brand, setBrand] = useState<string[]>([]);

	const handleToggle = (value: string) => () => {
		const currentIndex = brand.indexOf(value);
		const newChecked = [...brand];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setBrand(newChecked);
	};

	// const list = ["Apple", "XiaoMi", "Oppo", "Samsung", "Vivo", "Nokia"];
	const list: { id: string; label: string }[] = [
		{ id: "ap", label: "Apple" },
		{ id: "xm", label: "XiaoMi" },
		{ id: "op", label: "Oppo" },
		{ id: "ss", label: "Samsung" },
		{ id: "vv", label: "Vivo" },
		{ id: "nka", label: "Nokia" },
	];

	return (
		<div className={classes.root}>
			<List
				subheader={<ListSubheader>Brand</ListSubheader>}
				component="nav"
				aria-label="main mailbox folders"
			>
				{list.map((item, index) => {
					const labelId = `checkbox-list-label-${item.id}`;
					return (
						<ListItem
							key={item.id}
							button
							onClick={handleToggle(item.id)}
							classes={{
								root: classes.muiListItemRoot,
								selected: classes.muiListItemSelected,
							}}
						>
							<ListItemIcon>
								<Checkbox
									edge="start"
									checked={brand.indexOf(item.id) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ "aria-labelledby": labelId }}
									color="primary"
								/>
							</ListItemIcon>
							<ListItemText
								id={labelId}
								primary={item.label}
								// classes={{
								// 	root:
								// 		selectedIndex === index ? classes.selectedText : undefined,
								// }}
							/>
						</ListItem>
					);
				})}
			</List>
			<Divider />
			{/* <List component="nav" aria-label="secondary mailbox folder">
				<ListItem
					button
					selected={selectedIndex === 2}
					onClick={(event) => handleListItemClick(event, 2)}
				>
					<ListItemText primary="Trash" />
				</ListItem>
				<ListItem
					button
					selected={selectedIndex === 3}
					onClick={(event) => handleListItemClick(event, 3)}
				>
					<ListItemText primary="Spam" />
				</ListItem>
			</List> */}
		</div>
	);
}
