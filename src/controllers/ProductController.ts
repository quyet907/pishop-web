import { IProductController } from "../interface/IProductController";
import { Product } from "../models/Product";
import { BaseController } from "./BaseController";

export class ProductController extends BaseController<Product> implements IProductController {}
