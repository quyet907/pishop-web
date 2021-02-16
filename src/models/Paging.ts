export interface Paging<T> {
	page: number;
	pageSize: number;
	total: number;
	rows: T[];
	totalPages: number;
}
