import { appConfig } from "../config/Config";
import { ProductController } from "./ProductController";

export const productController = new ProductController(appConfig.apiGatewayURL, `product`);
