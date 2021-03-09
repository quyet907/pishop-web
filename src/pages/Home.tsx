import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import { List as ListIcon, NavigateBeforeRounded, NavigateNextRounded } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import ListCommon, { CommonListProps } from "../components/common/ListCommon";
import CommonSelect from "../components/common/SelectCommon";
import ProductFC from "../components/home/ProductFC";
import Layout from "../components/Layout";
import { categoryController, productController } from "../controllers";
import { BaseQuery } from "../interface/IBaseController";
import { Category } from "../models/Category";
import { Paging } from "../models/Paging";
import { Product } from "../models/Product";
import SwiperCore, { Navigation, Pagination as P, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

SwiperCore.use([Navigation, P, Scrollbar, A11y, Autoplay]);

const useStyles = makeStyles((theme) => ({
	root: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr 1fr",
		gap: 24,
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
		pageSize: 12,
		rows: [],
		total: 0,
		totalPages: 1,
	});

	const [category, setCategory] = useState<Paging<Category>>({
		page: 1,
		pageSize: 8,
		rows: [],
		total: 0,
		totalPages: 1,
	});

	const [query, setQuery] = useState<BaseQuery<Product>>({ page: 1, pageSize: 12 });
	const [filter, setFilter] = useState<any>({ price: "" });

	useEffect(() => {
		productController.findAll(query).then((res) => {
			console.log(res);
			setPagingProducts(res);
		});
	}, [query]);

	useEffect(() => {
		categoryController.findAll({ page: 1, pageSize: 100 }).then((res) => {
			setCategory(res);
		});
	}, []);

	return (
		<Layout>
			<Box>
				<Swiper
					loop={true}
					spaceBetween={50}
					slidesPerView={1}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					speed={1300}
					onSlideChange={() => console.log("slide change")}
					onSwiper={(swiper) => console.log(swiper)}
				>
					<SwiperSlide>
						<img
							src="https://firebasestorage.googleapis.com/v0/b/fir-app-87c8a.appspot.com/o/74b69cd7719a5e0f62331099fade7314.v1.png?alt=media&token=856c69c3-6d95-49f3-8cbc-33e0a51ae10d"
							alt="banner"
							width="100%"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							src="https://firebasestorage.googleapis.com/v0/b/fir-app-87c8a.appspot.com/o/266dab3c8c022089fa8bc8d42329543b.v1.png?alt=media&token=37f715c4-5adc-4365-a113-b659c9dd0015"
							alt="banner"
							width="100%"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							src="https://firebasestorage.googleapis.com/v0/b/fir-app-87c8a.appspot.com/o/8a4d538195f791befd8b03756fddadbe.v1.jpg?alt=media&token=8387f564-8224-461f-8939-26e108d1a96f"
							alt="banner"
							width="100%"
						/>
					</SwiperSlide>
				</Swiper>
			</Box>
			<Box minHeight={970} mt={2}>
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
						justifyContent="flex-end"
						flex={4}
						style={{ padding: "12px 0px" }}
					>
						{/* <Box display="flex" alignItems="center">
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
						</Box> */}
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
						<ListCommon
							items={category.rows.map((item) => {
								return { id: item.id, label: item.name };
							})}
							onChange={(item: CommonListProps) => {
								setQuery({
									...query,
									page: 1,
									categoryId: item.id,
								});
							}}
						></ListCommon>
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
