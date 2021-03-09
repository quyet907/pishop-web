import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { IBaseController } from "./IBaseController";

export interface ICategoryController extends IBaseController<Category> {}
