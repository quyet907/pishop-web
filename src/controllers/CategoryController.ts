import { ICategoryController } from "../interface/ICategoryController";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { BaseController } from "./BaseController";

export class CategoryController extends BaseController<Category> implements ICategoryController {}
