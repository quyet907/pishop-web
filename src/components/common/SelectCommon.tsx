import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";

export default function CommonSelect<T>(props: Props<T>) {
	return (
		<FormControl variant="outlined" size="small" style={{ minWidth: props.minWidth || 200 }}>
			<InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
			<Select
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={props.value}
				onChange={(e) => props.onChange && props.onChange(e.target.value as string)}
				label={props.label}
			>
				{props.options.map((item) => {
					return <MenuItem value={item.value}>{item.label}</MenuItem>;
				})}
			</Select>
		</FormControl>
	);
}

type Props<T> = {
	label: string;
	value?: T;
	options: {
		label: string;
		value: string;
	}[];
	onChange?(option: string): void;
	minWidth?: number;
};
