import {
	Box,
	Button,
	createStyles,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	lighten,
	makeStyles,
	MenuItem,
	OutlinedInput,
	Select,
	Theme,
	Toolbar,
	Tooltip,
	Typography,
} from "@material-ui/core";
import { Add, Delete, FilterListRounded, Search } from "@material-ui/icons";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { SearchingAlgorithm, SortingAlgorithm } from "../../pages/admin/ProductTable2";

const useToolbarStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(1),
			display: "flex",
			justifyContent: "space-between",
		},
		highlight:
			theme.palette.type === "light"
				? {
						color: theme.palette.secondary.main,
						backgroundColor: lighten(theme.palette.secondary.light, 0.85),
				  }
				: {
						color: theme.palette.text.primary,
						backgroundColor: theme.palette.secondary.dark,
				  },
		title: {
			flex: "1 1 100%",
		},
	})
);

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
	const classes = useToolbarStyles();
	const { numSelected } = props;
	const [field, setField] = useState<string>("name");
	const [algorithm, setAlgorithm] = useState<SearchingAlgorithm>("linear");
	const [sortAlgorithm, setSortAlgorithm] = useState<SortingAlgorithm>("selection");

	useEffect(() => {
		if (field !== "productCode" && algorithm === "binary") {
			setAlgorithm("linear");
			props.onChangeAlgorithm && props.onChangeAlgorithm("linear");
		}
	}, [field]);

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{/* {numSelected > 0 ? (
				<Typography
					className={classes.title}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Box style={{ display: "flex" }}>
					<Box>
						<FormControl style={{ minWidth: 300 }} size="small">
							<OutlinedInput
								placeholder="Search"
								startAdornment={
									<InputAdornment position="start">
										<Search color="disabled" />
									</InputAdornment>
								}
								onChange={props.onChangeText}
							></OutlinedInput>
						</FormControl>
					</Box>

					<Box ml={2}>
						<FormControl variant="outlined" size="small" style={{ minWidth: 140 }}>
							<InputLabel id="demo-simple-select-outlined-label">Field</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={field}
								onChange={(e) => {
									const value = e.target.value as string;
									setField(value);
									props.onChangeField && props.onChangeField(value);
								}}
								label="Field"
								placeholder="Order by"
							>
								<MenuItem value="productCode">Product Code</MenuItem>
								<MenuItem value="name">Name</MenuItem>
								<MenuItem value="brand">Brand</MenuItem>
							</Select>
						</FormControl>
					</Box>

					<Box ml={2}>
						<FormControl variant="outlined" size="small" style={{ minWidth: 160 }}>
							<InputLabel id="demo-simple-select-outlined-label">
								Searching algorithms
							</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={algorithm}
								onChange={(e) => {
									const value = e.target.value as SearchingAlgorithm;
									setAlgorithm(value);
									props.onChangeAlgorithm && props.onChangeAlgorithm(value);
								}}
								label="Searching algorithms"
								placeholder="Searching algorithms"
							>
								<MenuItem value="linear">Linear</MenuItem>
								<MenuItem disabled={field !== "productCode"} value="binary">
									Binary
								</MenuItem>
							</Select>
						</FormControl>
					</Box>

					<Box ml={2}>
						<FormControl variant="outlined" size="small" style={{ minWidth: 130 }}>
							<InputLabel id="demo-simple-select-outlined-label">
								Sorting algorithm
							</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={sortAlgorithm}
								onChange={(e) => {
									const value = e.target.value as SortingAlgorithm;
									setSortAlgorithm(value);
									props.onChangeSortAlg && props.onChangeSortAlg(value);
								}}
								label="Sorting algorithm"
								placeholder="Sorting algorithm"
							>
								<MenuItem value="selection">Selection</MenuItem>
								<MenuItem value="bubble">Bubble</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Box>
			)} */}

			{/* {numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton aria-label="delete">
						<Delete />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton aria-label="filter list">
						<FilterListRounded />
					</IconButton>
				</Tooltip>
			)} */}
			<Box flex={1} display="flex" justifyContent="flex-end">
				<Button
					variant="outlined"
					color="primary"
					startIcon={<Add />}
					onClick={props.onAddNew}
				>
					Add new
				</Button>
			</Box>
		</Toolbar>
	);
};

interface EnhancedTableToolbarProps {
	numSelected: number;
	onChangeText?(e: any): void;
	onChangeField?(value: string | number): void;
	onChangeAlgorithm?(value: SearchingAlgorithm): void;
	onChangeSortAlg?(value: SortingAlgorithm): void;
	onAddNew?(): void;
}
