import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { productController } from "../controllers";
import { Product } from "../models/Product";

interface ParamTypes {
	productId: string;
}

export default function ProductDetail(props: Props) {
	const { productId } = useParams<ParamTypes>();

	const [product, setProduct] = useState<Product>({
		description: "",
		discount: 0,
		id: 0,
		name: "",
		price: 0,
	});
	useEffect(() => {
		productController.getById(parseInt(productId)).then((res) => {
			console.log(res);
			setProduct(res);
		});
	}, []);

	return (
		<Layout>
			<Box display="flex" style={{ border: "1px solid #eee" }}>
				<Box width={300} height={300} justifyItems="center">
					<img
						style={{ height: "100%" }}
						src="https://images-na.ssl-images-amazon.com/images/I/81F-QC1N5WL._AC_SL1500_.jpg"
						alt="img"
					/>
				</Box>
				<Box flex={1}>
					<Box>
						<Typography variant="h5">{product.name}</Typography>
					</Box>
					<Box>
						<Typography>{product.price}</Typography>
					</Box>
					<Box>
						<Typography>{product.description}</Typography>
					</Box>
				</Box>
			</Box>
		</Layout>
	);
}

type Props = {};
