import { Paging } from "../models/Paging";

export interface IBaseController<T> {
	findAll(props: BaseQuery<T>): Promise<Paging<T>>;
	findById(id: number): Promise<T>;
	delete(id: string): Promise<T> | undefined;
	update(t: T): Promise<T>;
}

export type Order = "asc" | "desc";

export interface BaseQuery<T> {
	page: number;
	pageSize: number;
	order?: Order;
	orderBy?: keyof T;
	searchText?: string;
	searchField?: keyof T;
	column?: (keyof T)[];
	categoryId?: string;
}
