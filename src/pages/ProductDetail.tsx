import {
	Box,
	Button,
	Container,
	Divider,
	Grid,
	makeStyles,
	Typography,
	withStyles,
} from "@material-ui/core";
import { Add, ShoppingCartOutlined } from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { productController } from "../controllers";
import { Product } from "../models/Product";
import { theme } from "../theme/muiTheme";
import { convertMonney } from "../utils/Utils";
import Cart from "./Cart";

interface ParamTypes {
	productId: string;
}

const useStyles = makeStyles((theme) => ({
	toggleButton: {
		"& button": {
			borderRadius: "50% !important",
			marginRight: 16,
			padding: 6,
			background: "none !important",
			"&:hover": {
				backgroundColor: "unset",
			},
			"&.MuiToggleButton-root.Mui-selected": {
				border: "1px solid !important",
			},
		},
	},
	itemColor: {
		width: 40,
		height: 40,
		borderRadius: "50%",
	},
	toggleButtonSize: {
		"& button": {
			padding: "8px 16px",
			background: "none !important",
			"&:hover": {
				backgroundColor: "unset",
			},
			"&.MuiToggleButton-root.Mui-selected": {
				border: "1px solid !important",
			},
		},
	},
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
	grouped: {
		margin: theme.spacing(0.5),
		border: "none",
		"&:not(:first-child)": {
			borderRadius: theme.shape.borderRadius,
		},
		"&:first-child": {
			borderRadius: theme.shape.borderRadius,
		},
	},
}))(ToggleButtonGroup);

export default function ProductDetail(props: Props) {
	const { productId } = useParams<ParamTypes>();
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();

	const [product, setProduct] = useState<Product>({
		description: "",
		discount: 0,
		id: "",
		name: "",
		price: 0,
		quantity: 0,
		categoryId: "",
	});

	const [size, setSize] = useState<number>(64);

	const [color, setColor] = useState<string>("red");
	useEffect(() => {
		productController.findById(parseInt(productId)).then((res) => {
			setProduct(res);
		});
	}, []);

	const [cartLength, setCartLength] = useState<number>(0);

	return (
		<Layout cartLength={cartLength}>
			<Grid container>
				<Grid
					container
					item
					xs={12}
					direction="row"
					style={{
						boxShadow: "-5px 5px 15px #ededed, 5px -5px 15px #ffffff",
						borderRadius: 10,
						padding: `40px 32px`,
						boxSizing: "border-box"
					}}
				>
					<Grid item xs={6}>
						<Box height={400}>
							<img
								src={product.thumbs ? (product.thumbs as any) : ""}
								alt=""
								style={{ objectFit: "contain", width: "100%", height: "100%" }}
							/>
						</Box>
					</Grid>

					<Grid item xs={6}>
						<Box pl={7}>
							<Typography variant={"h6"}>{product.name}</Typography>

							<Box mt={1}></Box>
							{product.discount > 0 ? (
								<Typography display="inline" variant={"h6"}>
									{convertMonney(
										(product.price / 100) * (100 - product.discount)
									)}
									<Typography
										style={{ textDecoration: "line-through" }}
										variant="caption"
									>
										{convertMonney(product.price)}
									</Typography>
								</Typography>
							) : (
								<Typography variant={"h6"}>
									{convertMonney(product.price)}
								</Typography>
							)}

							<Box my={2}>
								<Divider />
							</Box>

							<Box>
								<Box mb={1}>
									<Typography variant={"h6"}>Size</Typography>
								</Box>
								<StyledToggleButtonGroup
									size="small"
									value={size}
									exclusive
									onChange={(e, v) => v && setSize(v as number)}
									aria-label="text alignment"
									className={classes.toggleButtonSize}
								>
									<ToggleButton
										disableRipple
										value={64}
										aria-label="left aligned"
									>
										<Typography style={{ fontWeight: 600 }}>64GB</Typography>
									</ToggleButton>
									<ToggleButton disableRipple value={128} aria-label="centered">
										<Typography style={{ fontWeight: 600 }}>128GB</Typography>
									</ToggleButton>
									<ToggleButton
										disableRipple
										value={256}
										aria-label="right aligned"
									>
										<Typography style={{ fontWeight: 600 }}>256GB</Typography>
									</ToggleButton>
									<ToggleButton disableRipple value={512} aria-label="justified">
										<Typography style={{ fontWeight: 600 }}>512GB</Typography>
									</ToggleButton>
								</StyledToggleButtonGroup>
							</Box>

							<Box mt={3}>
								<Box mb={1}>
									<Typography variant={"h6"}>Color</Typography>
								</Box>
								<StyledToggleButtonGroup
									size="small"
									value={color}
									exclusive
									onChange={(e, v) => v && setColor(v)}
									aria-label="text alignment"
									className={classes.toggleButton}
								>
									<ToggleButton
										disableRipple
										value="red"
										aria-label="left aligned"
									>
										<Box
											style={{
												background: "red",
											}}
											className={classes.itemColor}
										></Box>
									</ToggleButton>
									<ToggleButton disableRipple value="black" aria-label="centered">
										<Box
											style={{
												background: "black",
											}}
											className={classes.itemColor}
										></Box>
									</ToggleButton>
									<ToggleButton
										disableRipple
										value="blue"
										aria-label="right aligned"
									>
										<Box
											style={{
												background: "#0066c0",
											}}
											className={classes.itemColor}
										></Box>
									</ToggleButton>
									<ToggleButton
										disableRipple
										value="green"
										aria-label="justified"
									>
										<Box
											style={{
												background: "#ccf5d9",
											}}
											className={classes.itemColor}
										></Box>
									</ToggleButton>
								</StyledToggleButtonGroup>
							</Box>

							<Box mt={2} mb={3}>
								<Divider />
							</Box>

							<Box display="flex">
								<Button
									startIcon={<Add />}
									color="primary"
									variant="contained"
									onClick={() => {
										setCartLength(cartLength + 1);
										enqueueSnackbar("The product has been added to cart!")
									}}
								>
									Add To Cart
								</Button>
								<Box mx={1.5}></Box>
								<Button
									startIcon={<ShoppingCartOutlined />}
									color="secondary"
									variant="contained"
								>
									Buy now
								</Button>
							</Box>
						</Box>
					</Grid>
				</Grid>
				<Grid item xs={12} style={{ marginTop: theme.spacing(7) }}>
					<Typography variant={"h6"}>Description</Typography>

					<Box mt={3}>
						<Typography>{product.description}</Typography>
					</Box>
				</Grid>
			</Grid>
		</Layout>
	);
}

type Props = {};
