import { BaseModel } from "./BaseModel";
import { Category } from "./Category";

export interface Product extends BaseModel {
	name: string;
	price: number;
	discount: number;
	description: string;
	quantity: number;
	category?: Category;
	categoryId: string;
	thumbs?: Blob;
}
