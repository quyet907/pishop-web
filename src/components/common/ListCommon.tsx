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

export interface CommonListProps {
	id: string;
	label: string;
}

type Props = {
	items: CommonListProps[];
	onChange?(items: CommonListProps): void;
};

export default function ListCommon(props: Props) {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [brand, setBrand] = useState<string[]>([]);

	const handleListItemClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		index: number
	) => {
		setSelectedIndex(index);
	};

	// const list = ["Apple", "XiaoMi", "Oppo", "Samsung", "Vivo", "Nokia"];

	return (
		<div className={classes.root}>
			<List
				subheader={<ListSubheader>Brand</ListSubheader>}
				component="nav"
				aria-label="main mailbox folders"
			>
				{props.items.map((item, index) => {
					return (
						<ListItem
							key={item.id}
							button
							selected={selectedIndex === index}
							onClick={(event) => {
								handleListItemClick(event, index);
								if (index !== selectedIndex) props.onChange && props.onChange(item);
							}}
							classes={{
								root: classes.muiListItemRoot,
								selected: classes.muiListItemSelected,
							}}
						>
							{/* <ListItemIcon>
								<Checkbox
									edge="start"
									checked={brand.indexOf(item.id) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ "aria-labelledby": item.id }}
									color="primary"
								/>
							</ListItemIcon> */}
							<ListItemText
								primary={item.label}
								classes={{
									root:
										selectedIndex === index ? classes.selectedText : undefined,
								}}
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
