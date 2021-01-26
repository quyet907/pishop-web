import { makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../config/Config";

const useStyles = makeStyles((theme) => ({
	title: {
		display: "inline-block",
		width: 100,
	},
}));

export default function Home() {
	const classes = useStyles();
	const tinhTong = (n: number): number => (n === 0 ? 0 : tinhTong(n - 1) + n);

	const tinhGiaiThua = (n: number): number => (n === 1 ? 1 : tinhGiaiThua(n - 1) * n);

	const tinhFibonacci = (n: number): number => {
		return n === 1 || n === 2 ? 1 : tinhFibonacci(n - 1) + tinhFibonacci(n - 2) + n;
	};

	// const tinhFibonacci = (n: number): number => {};

	const [tong, setTong] = useState<number>(0);

	const [giaiThua, setGiaiThua] = useState<number>(1);

	const [fibonacci, setFibonacci] = useState<number>(1);

	useEffect(() => {
		console.log("call");
		
		axios.post(API).then((res) => {
			console.log(res);
		});
	}, []);

	return (
		<div>
			<div>
				<span className={classes.title}>Tong</span>
				<input
					min={0}
					type="number"
					onChange={(e) => {
						let tongMoi = tinhTong(parseInt(e.target.value || "0"));
						setTong(tongMoi);
					}}
					style={{ width: 100, marginRight: 20, marginLeft: 10 }}
				/>

				<span>{tong}</span>
			</div>

			<div style={{ marginTop: 20 }}>
				<span className={classes.title}>Giai thua</span>
				<input
					min={1}
					type="number"
					onChange={(e) => {
						let giaiThua = tinhGiaiThua(parseInt(e.target.value || "1"));
						setGiaiThua(giaiThua);
					}}
					style={{ width: 100, marginRight: 20, marginLeft: 10 }}
				/>

				<span>{giaiThua}</span>
			</div>

			<div style={{ marginTop: 20 }}>
				<span className={classes.title}>Fibonacci</span>
				<input
					type="number"
					onChange={(e) => {
						let fibonacci = tinhFibonacci(parseInt(e.target.value || "1"));
						setFibonacci(fibonacci);
					}}
					style={{ width: 100, marginRight: 20, marginLeft: 10 }}
				/>

				<span>{fibonacci}</span>
			</div>
		</div>
	);
}
