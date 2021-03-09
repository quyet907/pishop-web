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
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import * as Yup from "yup";

type Props = {
	open: boolean;
	onClose?(): void;
	onConfirm(product: Product): void;
	item: Product;
	categories: Category[];
};

const ProductSchema = Yup.object().shape({
	thumbs: Yup.string(),
	name: Yup.string().required("Required"),
	price: Yup.number().min(0, "Quantity > 0").required("Required"),
	quantity: Yup.number().min(1, "Quantity > 0").required("Required"),
	discount: Yup.number().min(0, "Discount >= 0"),
	categoryId: Yup.string()
});

export default function PopUpEdit(props: Props) {
	const [product, setProduct] = useState<Product>({
		id: "",
		categoryId: "1",
		description: "",
		discount: 0,
		name: "",
		price: 0,
		quantity: 0,
	});

	const [filename, setFilename] = useState<string>("");

	const convertBase64 = (file: Blob) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const handleFileRead = async (event: any) => {
		const file = event.target.files[0];
		setFilename(file.name);
		const base64 = await convertBase64(file);
		setProduct({ ...product, thumbs: base64 as any });
		console.log(base64);
	};

	const formik = useFormik({
		initialValues: product,
		enableReinitialize: true,
		validationSchema: ProductSchema,
		onSubmit: (values, { setSubmitting }) => {
			// setSubmitting(true);
			console.log(values);
			props.onClose && props.onClose();
			props.onConfirm(values);
		},
	});

	useEffect(() => {
		setProduct({ ...props.item, thumbs: props.item.thumbs as any || "", categoryId: props.item.category?.id || "1" });
	}, [props]);

	return (
		<form onSubmit={formik.handleSubmit}>
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
					<Box display="flex" mb={3}>
						<TextField
							name={"thumbs"}
							onChange={formik.handleChange}
							value={formik.values.thumbs}
							label="Image"
							fullWidth
							variant="outlined"
						></TextField>
						<Box ml={2}>
							<input
								accept="image/*"
								style={{ display: "none" }}
								id="contained-button-file"
								multiple
								type="file"
								onChange={handleFileRead}
							/>
							<label htmlFor="contained-button-file">
								<Button
									size="large"
									variant="outlined"
									color="primary"
									component="span"
								>
									Upload
								</Button>
							</label>
						</Box>
					</Box>
					<TextField
						variant="outlined"
						fullWidth
						name={"name"}
						label="Name"
						onChange={formik.handleChange}
						value={formik.values.name}
						error={!!formik.errors.name && formik.touched.name}
						helperText={formik.errors.name ? formik.errors.name : null}
					></TextField>
					<Box mt={3}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel id="demo-simple-select-outlined-label">Brand</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={product.categoryId || product.category?.id || "1"}
								onChange={(e) => {
									const value = e.target.value as string;

									setProduct({
										...product,
										categoryId: value,
										category: { name: product.category?.name || "", id: value },
									});
								}}
								label="Field"
								placeholder="Order by"
							>
								{props.categories.map((item) => {
									return <MenuItem value={item.id}>{item.name}</MenuItem>;
								})}
							</Select>
						</FormControl>
					</Box>
					<Box mt={3} />
					<TextField
						name={"price"}
						onChange={formik.handleChange}
						value={formik.values.price}
						variant="outlined"
						fullWidth
						label="Price"
						type="number"
						error={!!formik.errors.price && formik.touched.price}
						helperText={formik.errors.price ? formik.errors.price : null}
					></TextField>
					<Box mt={3} />
					<TextField
						name={"quantity"}
						onChange={formik.handleChange}
						value={formik.values.quantity}
						variant="outlined"
						fullWidth
						type="number"
						label="Quantity"
						error={!!formik.errors.quantity && formik.touched.quantity}
						helperText={formik.errors.quantity ? formik.errors.quantity : null}
					></TextField>
					<Box mt={3} />

					<TextField
						name={"discount"}
						onChange={formik.handleChange}
						value={formik.values.discount}
						variant="outlined"
						fullWidth
						type="number"
						label="Discount"
						error={!!formik.errors.discount && formik.touched.discount}
						helperText={formik.errors.discount ? formik.errors.discount : null}
					></TextField>
					<Box mt={3} />
					<TextField
						name={"discount"}
						onChange={formik.handleChange}
						value={formik.values.description}
						variant="outlined"
						fullWidth
						multiline
						rows={4}
						label="Description"
					></TextField>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => {
						props.onClose && props.onClose();
						formik.resetForm();
					}} color="primary">
						CANCEL
					</Button>
					<Button type="submit" onClick={formik.submitForm} color="primary" autoFocus>
						SAVE
					</Button>
				</DialogActions>
			</Dialog>
		</form>
	);
}
