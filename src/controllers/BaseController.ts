import axios from "axios";
import { IBaseController, ListProps } from "../interface/IBaseController";
import { Paging } from "../models/Paging";

export class BaseController<T> implements IBaseController<T> {
	service: string;
	path: string;

	constructor(service: string, path: string) {
		this.service = service;
		this.path = path;
	}

	getById(id: number): Promise<T> {
		return axios.get(`${this.service}/${this.path}`, { params: {id: id} }).then((res) => {
			return res.data;
		});
	}
	delete(id: string): Promise<T> | undefined {
		return axios.delete(`${this.service}/${this.path}`, { params: id }).then((res) => {
			return res.data;
		});
	}
	update(t: T): Promise<T> {
		return axios.post(`${this.service}/${this.path}`, { params: t }).then((res) => {
			return res.data;
		});
	}

	getList(props: ListProps): Promise<Paging<T>> {
		return axios.get(`${this.service}/${this.path}`, { params: props }).then((res) => {
			return res.data;
		});
	}
}
