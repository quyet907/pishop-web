import { appConfig } from "../config/Config";
import { CategoryController } from "./CategoryController";
import { ProductController } from "./ProductController";

export const productController = new ProductController(appConfig.apiGatewayURL, `product`);
export const categoryController = new CategoryController(appConfig.apiGatewayURL, `category`);

