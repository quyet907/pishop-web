import { Box, IconButton, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Edit, HighlightOff } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import ConfirmPopUp from "../../components/ConfirmPopUp";
import PopUpEditCategory from "../../components/PopUpEditCategory";
import TableHeadCategory from "../../components/table/TableHeadCategory";
import { EnhancedTableToolbar } from "../../components/table/Toolbar";
import { categoryController } from "../../controllers";
import { Order } from "../../interface/IBaseController";
import { Category } from "../../models/Category";
import { Paging } from "../../models/Paging";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
		},
		paper: {
			width: "100%",
			marginBottom: theme.spacing(2),
		},
		table: {
			minWidth: 750,
		},
		visuallyHidden: {
			border: 0,
			clip: "rect(0 0 0 0)",
			height: 1,
			margin: -1,
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			top: 20,
			width: 1,
		},
	})
);

const ROWSPERPAGEOPTIONS = [7, 15, 25];

export type SearchingAlgorithm = "linear" | "binary";
export type SortingAlgorithm = "selection" | "bubble";

interface Query<T> {
	page: number;
	pageSize: number;
	order?: Order;
	orderBy?: keyof T;
	searchText?: string;
	searchField?: keyof T;
	searchingAlgorithm?: SearchingAlgorithm;
	sortingAlgorithm?: SortingAlgorithm;
}

export default function CategoryTable() {
	const classes = useStyles();
	const [confirmPopUp, setConfirmPopUp] = useState<boolean>(false);
	const [popUpEdit, setPopUpEdit] = useState<boolean>(false);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [selectedItem, setSelectedItem] = useState<Category>({
		id: "",
		name: "",
	});
	const [query, setQuery] = React.useState<Query<Category>>({
		page: 1,
		pageSize: ROWSPERPAGEOPTIONS[0],
	});
	const [pagingItem, setPagingItem] = useState<Paging<Category>>({
		page: 1,
		pageSize: 7,
		rows: [],
		total: 1,
		totalPages: 1,
	});

	const [selected, setSelected] = React.useState<string[]>([]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setQuery({ ...query, page: newPage + 1 });
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery({ ...query, pageSize: parseInt(event.target.value, 10), page: 1 });
	};

	useEffect(() => {
		categoryController.findAll(query).then((res) => {
			setPagingItem(res);
		});
	}, []);

	return (
		<div className={classes.root}>
			<Box>
				<EnhancedTableToolbar
					// onChangeText={(e) =>
					// 	setQuery({ ...query, searchText: e.target.value as string })
					// }
					// onChangeField={(value) => {
					// 	setQuery({ ...query, searchField: value as keyof Product });
					// }}
					onChangeAlgorithm={(value) => {
						setQuery({ ...query, searchingAlgorithm: value });
					}}
					onChangeSortAlg={(value) => {
						setQuery({ ...query, sortingAlgorithm: value });
					}}
					numSelected={selected.length}
					onAddNew={() => {
						setPopUpEdit(true);
						setSelectedItem({ id: "", name: "" });
					}}
				/>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size="medium"
						aria-label="enhanced table"
					>
						<TableHeadCategory
							classes={classes}
							numSelected={selected.length}
							// order={query.order}
							// orderBy={query.orderBy}
							// onSelectAllClick={handleSelectAllClick}
							onRequestSort={() => {
								// handleRequestSort
							}}
							rowCount={pagingItem.total}
						/>
						<TableBody color="primary">
							{pagingItem.rows.map((item, index) => {
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										// onClick={(event) => handleClick(event, row.name)}
										// role="checkbox"
										tabIndex={-1}
										key={item.name}
									>
										<TableCell>{item.id}</TableCell>
										<TableCell>{item.name}</TableCell>

										<TableCell align="right">
											<Box display="flex" justifyContent="flex-end">
												<IconButton
													style={{ padding: 12 }}
													onClick={() => {
														setPopUpEdit(true);
														setSelectedItem(item);
													}}
												>
													<Edit color="primary" />
												</IconButton>
												<IconButton
													style={{ padding: 12 }}
													onClick={() => {
														setConfirmPopUp(true);
														setSelectedItem(item);
													}}
												>
													<HighlightOff color="error" />
												</IconButton>
											</Box>
										</TableCell>
										{/* <TableCell align="right">{row.createdAt}</TableCell> */}
									</TableRow>
								);
							})}
							{/* {emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)} */}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={ROWSPERPAGEOPTIONS}
					component="div"
					count={pagingItem.total}
					rowsPerPage={pagingItem.pageSize}
					page={pagingItem.page - 1}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Box>
			<ConfirmPopUp
				open={confirmPopUp}
				onClose={() => setConfirmPopUp(false)}
				onConfirm={() => {
					categoryController
						.delete(selectedItem.id || "")
						?.then((res) => {
							categoryController.findAll(query).then((res) => {
								setPagingItem(res);
							});
						})
						.catch((err) => {
							enqueueSnackbar("Have an error!", { variant: "error" });
						});

					setConfirmPopUp(false);
				}}
			></ConfirmPopUp>
			<PopUpEditCategory
				item={selectedItem}
				open={popUpEdit}
				onClose={() => setPopUpEdit(false)}
				onConfirm={(category) => {
					categoryController.update(category).then((res) => {
						setPopUpEdit(false);
						categoryController.findAll(query).then((res) => {
							setPagingItem(res);
						});
					});
				}}
			></PopUpEditCategory>
		</div>
	);
}

const convertMonney = (price: number): string => {
	const stringPrice = new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(price);
	return stringPrice;
};

const getHightLightText = (value: string | number, searchText: string): React.ReactNode => {
	if (searchText) {
		const regEx = new RegExp(searchText, "i");
		const newValue = value
			.toString()
			.replace(regEx, '<span style="background-color:yellow;">$&</span>');
		return (
			<Typography
				display="inline"
				dangerouslySetInnerHTML={{ __html: newValue }}
			></Typography>
		);
	}
	return value;
};
