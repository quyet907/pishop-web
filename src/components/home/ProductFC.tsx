import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Grid,
	makeStyles,
	Typography,
	withStyles,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Product } from "../../models/Product";
import { convertMonney } from "../../utils/Utils";

const useStyles = makeStyles((theme) => ({
	root: {
		// maxWidth: 345,
		"&:hover": {
			transform: "translateY(-2px)",
			transition: "transform 0.3s",
		},
	},
	media: {
		height: 210,
		backgroundSize: "contain",
		boxSizing: "border-box",
	},
	cardContent: {
		padding: 10,
		marginBottom: 10
	},
}));

export default function ProductFC(props: Props) {
	const classes = useStyles();
	const history = useHistory();

	return (
		<Card className={classes.root}>
			<CardActionArea onClick={() => history.push(`/product/${props.item.id}`)}>
				<CardMedia className={classes.media} image={props.item.thumbs as any} title="img" />
				<CardContent classes={{ root: classes.cardContent }}>
					<Box height={45}>
						<Typography style={{ fontSize: "0.9rem", fontWeight: 500 }}>
							{props.item.name}
						</Typography>
					</Box>
					<Box>
						{props.item.discount > 0 ? (
							<Typography display="inline">
								<Typography
									display="inline"
									style={{ fontSize: "1rem", fontWeight: 500,  }}
								>
									{convertMonney(
										(props.item.price / 100) * (100 - props.item.discount)
									)}
								</Typography>
								<Typography
									style={{ textDecoration: "line-through", marginLeft: 4 }}
									variant="caption"
								>
									{convertMonney(props.item.price)}
								</Typography>
								{/* <Typography style={{ marginLeft: 4, color: "#ee4d2d" }} variant="caption">
									-{props.item.discount}%
								</Typography> */}
							</Typography>
						) : (
							<Typography style={{ fontSize: "1rem", fontWeight: 500,  }}>
								{convertMonney(props.item.price)}
							</Typography>
						)}
					</Box>
					{/* <Typography
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
					</Typography> */}
				</CardContent>
			</CardActionArea>
			{/* <CardActions style={{ justifyContent: "flex-end" }}>
				<Button size="small" color="primary">
					Add
				</Button>
			</CardActions> */}
		</Card>
	);
}

type Props = {
	item: Product;
};
