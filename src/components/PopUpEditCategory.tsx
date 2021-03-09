import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Category } from "../models/Category";
import { Product } from "../models/Product";

type Props = {
	open: boolean;
	onClose?(): void;
	onConfirm(product: Category): void;
	item: Category;
};

export default function PopUpEdit(props: Props) {
	const [category, setCategory] = useState<Category>({
		id: "",
		name: "",
	});

	useEffect(() => {
		setCategory(props.item);
	}, [props]);

	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}
			maxWidth="xs"
			fullWidth
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{props.item.name}</DialogTitle>
			<DialogContent>
				<TextField
					variant="outlined"
					fullWidth
					label="Name"
					value={category.name}
					onChange={(e) => {
						setCategory({ ...category, name: e.target.value as string });
					}}
				></TextField>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose} color="primary">
					CANCEL
				</Button>
				<Button onClick={() => props.onConfirm(category)} color="primary" autoFocus>
					SAVE
				</Button>
			</DialogActions>
		</Dialog>
	);
}
