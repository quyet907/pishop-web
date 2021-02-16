import { Box, Container, GridList, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import ProductFC from "../components/Home/ProductFC";
import Layout from "../components/Layout";
import { productController } from "../controllers";
import { ListProps } from "../interface/IBaseController";
import { Paging } from "../models/Paging";
import { Product } from "../models/Product";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "grid",
		gridTemplateColumns: "auto auto auto auto",
		gap: 24,
	},
}));

export default function Home() {
	const classes = useStyles();
	const [pagingProduct, setPagingProducts] = useState<Paging<Product>>({
		page: 1,
		pageSize: 8,
		rows: [],
		total: 0,
		totalPages: 1,
	});
	const [query, setQuery] = useState<ListProps>({ page: 1, pageSize: 8 });

	useEffect(() => {
		productController.getList(query).then((res) => {
			console.log(res);
			setPagingProducts(res);
		});
	}, [query]);

	return (
		<Layout>
			<Box className={classes.root}>
				{pagingProduct.rows.map((item) => {
					return <ProductFC item={item} />;
				})}
			</Box>
			<Box mt={9} display="flex" justifyContent="center">
				<Pagination
					count={pagingProduct.totalPages}
					variant="outlined"
					shape="rounded"
					onChange={(e, page) => setQuery({ ...query, page: page })}
				/>
			</Box>
		</Layout>
	);
}
