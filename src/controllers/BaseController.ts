import axios from "axios";
import { BaseQuery, IBaseController} from "../interface/IBaseController";
import { Paging } from "../models/Paging";

export class BaseController<T> implements IBaseController<T> {
	service: string;
	path: string;

	constructor(service: string, path: string) {
		this.service = service;
		this.path = path;
	}
	
	findAll(props: BaseQuery<T>): Promise<Paging<T>> {
		return axios.get(`${this.service}/${this.path}`, { params: props }).then((res) => {
			return  res.data;
		});
	}
	findById(id: number): Promise<T> {
		return axios.get(`${this.service}/${this.path}`, { params: { id: id } }).then((res) => {
			return res.data;
		});
	}
	delete(id: string): Promise<T> | undefined {
		return axios.delete(`${this.service}/${this.path}`, { params: { id: id } }).then((res) => {
			return res.data;
		});
	}
	update(t: T): Promise<T> {
		return axios.post(`${this.service}/${this.path}`, t).then((res) => {
			return res.data;
		});
	}

	// 	getById(id: number): Promise<T> {
	// 		return axios.get(`${this.service}/${this.path}`, { params: {id: id} }).then((res) => {
	// 			return res.data;
	// 		});
	// 	}
	// 	delete(id: string): Promise<T> | undefined {
	// 		return axios.delete(`${this.service}/${this.path}`, { params: {id: id} }).then((res) => {
	// 			return res.data;
	// 		});
	// 	}
	// 	update(t: T): Promise<T> {
	// 		return axios.post(`${this.service}/${this.path}`,  t ).then((res) => {
	// 			return res.data;
	// 		});
	// 	}
	//
	// 	findAll(props: BaseQuery<T>): Promise<Paging<T>> {
	// 		return axios.get(`${this.service}/${this.path}`, { params: props }).then((res) => {
	// 			return res.data;
	// 		});
	// 	}
}
