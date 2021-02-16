import { BaseModel } from "./BaseModel";

export interface Product extends BaseModel {
	name: string;
	price: number;
	discount: number;
	description: string;
}
