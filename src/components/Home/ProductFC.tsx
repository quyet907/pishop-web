import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	makeStyles,
	Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Product } from "../../models/Product";

const useStyles = makeStyles((theme) => ({
	root: {
		// maxWidth: 345,
		"&:hover": {
			transform: "translateY(-2px)",
			transition: "transform 0.3s",
		},
	},
	media: {
		height: 190,
		backgroundSize: "contain",
	},
	cardContent: {
		padding: 10,
	},
}));

export default function ProductFC(props: Props) {
	const classes = useStyles();
	const history = useHistory();
	const convertMonney = (num: number) => {
		return num.toLocaleString("en-US", { style: "currency", currency: "VND" });
	};
	return (
		<Card className={classes.root}>
			<CardActionArea onClick={() => history.push(`/product/${props.item.id}`)}>
				<CardMedia
					className={classes.media}
					image="https://images-na.ssl-images-amazon.com/images/I/81F-QC1N5WL._AC_SL1500_.jpg"
					title="img"
				/>
				<CardContent classes={{ root: classes.cardContent }}>
					<Box height={45}>
						<Typography variant="subtitle1">{props.item.name}</Typography>
					</Box>
					<Typography variant="subtitle2">{convertMonney(props.item.price)}</Typography>
					<Typography
						variant="caption"
						style={{
							WebkitLineClamp: 2,
							overflow: "hidden",
							textOverflow: "ellipsis",
							wordBreak: "break-word",
							display: "-webkit-box",
							WebkitBoxOrient: "vertical",
						}}
					>
						{props.item.description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions style={{ justifyContent: "flex-end" }}>
				<Button size="small" color="primary">
					Add
				</Button>
			</CardActions>
		</Card>
	);
}

type Props = {
	item: Product;
};
