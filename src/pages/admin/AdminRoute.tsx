import { Container, Typography } from "@material-ui/core";
import React from "react";

export default function AdminRoute() {
	const arr = [18,6,2,9,6,10,3,17];

	const sort = (arr: number[], type?: "increase" | "decrease"): number[] => {
		for (let i = 0; i < arr.length - 1; i++) {
			for (let j = i + 1; j < arr.length; j++) {
				if (arr[j] < arr[i]) {
					let temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
				console.log(arr);
				console.log("i", i, "j", j);
			}

			console.log("======");
		}

		return arr;
	};

	const bubbleSort = (arr: number[]): number[] => {
		for (let i = 0; i < arr.length - 1; i++) {
			if (arr[i] > arr[i + 1]) {
				let temp = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = temp;
			}
		}
        return arr;
	};
	return (
		<Container>
			<Typography>Array: {arr.map((item) => `${item} `)}</Typography>
			<Typography>Sorted: {bubbleSort(arr).map((item) => `${item} `)}</Typography>
		</Container>
	);
}
