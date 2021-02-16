import {
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
	},
	media: {
		height: 190,
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
					image="https://picsum.photos/500/1000"
					title="img"
				/>
				<CardContent>
					<Typography variant="h6">{props.item.name}</Typography>
					<Typography variant="h5">{convertMonney(props.item.price)}</Typography>
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
