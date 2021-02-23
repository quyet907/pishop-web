import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import { List as ListIcon, NavigateBeforeRounded, NavigateNextRounded } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import ListCommon from "../components/common/ListCommon";
import CommonSelect from "../components/common/SelectCommon";
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
		gap: 16,
	},
	iconFilterBf: {
		borderRadius: `5px 0px 0px 5px`,
		padding: 4,
		border: "1px solid #eee",
	},
	iconFilterN: {
		borderRadius: `0px 5px 5px 0px`,
		padding: 4,
		border: "1px solid #eee",
	},
	marginRight: {
		marginRight: theme.spacing(3),
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
	const [filter, setFilter] = useState<any>({ price: "" });

	useEffect(() => {
		productController.getList(query).then((res) => {
			console.log(res);
			setPagingProducts(res);
		});
	}, [query]);

	return (
		<Layout>
			<Box minHeight={970}>
				<Box display="flex" alignItems="center">
					<Box
						display="flex"
						alignItems="center"
						flex={1}
						className={classes.marginRight}
					>
						<ListIcon />
						<Box mr={1}></Box>
						<Typography variant={"h6"}>Search category</Typography>
					</Box>

					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
						flex={4}
						style={{ padding: "12px 0px" }}
					>
						<Box display="flex" alignItems="center">
							<Box mr={3}>
								<Typography>Sort by</Typography>
							</Box>
							<CommonSelect
								label="Price"
								options={[
									{ label: "Low to High", value: "increase" },
									{ label: "High to Low", value: "decrease" },
								]}
								onChange={(value) => setFilter({ ...filter, price: value })}
								value={filter.price}
							></CommonSelect>
						</Box>
						<Box display="flex" alignItems="center">
							<Box mr={2}>
								<Typography>
									{pagingProduct.page}/{pagingProduct.totalPages}
								</Typography>
							</Box>
							<IconButton
								disabled={pagingProduct.page === 1}
								onClick={() => setQuery({ ...query, page: query.page - 1 })}
								classes={{ root: classes.iconFilterBf }}
							>
								<NavigateBeforeRounded></NavigateBeforeRounded>
							</IconButton>
							<IconButton
								disabled={pagingProduct.page === pagingProduct.totalPages}
								onClick={() => setQuery({ ...query, page: query.page + 1 })}
								classes={{ root: classes.iconFilterN }}
							>
								<NavigateNextRounded></NavigateNextRounded>
							</IconButton>
						</Box>
					</Box>
				</Box>
				<Box display={"flex"} minHeight={300}>
					<Box flex={1} className={classes.marginRight}>
						<ListCommon></ListCommon>
					</Box>
					<Box flex={4} mt={1}>
						<Box className={classes.root}>
							{pagingProduct.rows.map((item) => {
								return <ProductFC item={item} />;
							})}
						</Box>
						<Box mt={9} display="flex" justifyContent="center">
							<Pagination
								page={pagingProduct.page}
								count={pagingProduct.totalPages}
								variant="outlined"
								shape="rounded"
								onChange={(e, page) => setQuery({ ...query, page: page })}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</Layout>
	);
}
