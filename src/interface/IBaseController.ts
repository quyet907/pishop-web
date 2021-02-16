import { Paging } from "../models/Paging";

export interface IBaseController<T> {
	getList(props: ListProps): Promise<Paging<T>>;
	getById(id: string): Promise<T>;
	delete(id: string): Promise<T> | undefined;
	update(t: T): Promise<T>;
}


export interface ListProps {
	page: number;
	pageSize: number;
	searchText?: string;
}