import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
import { Product } from "../models/Product";

export default function ProductDetail(props: Props) {
	// const { item } = props;
	return (
		<Container>
			<Box display="flex" style={{ border: "1px solid #eee" }}>
				<Box flex={1} height={300}>
					<img
						style={{ height: "100%" }}
						src="https://picsum.photos/1500/1200"
						alt="img"
					/>
				</Box>
				<Box flex={1}>
					<Typography>Name</Typography>
					<Typography>74587347</Typography>
					<Typography>Desc</Typography>
				</Box>
			</Box>
		</Container>
	);
}

type Props = {
	// item: Product;
};
