export interface IConfig {
	applicationURL: string;
	apiGatewayURL: string;
}

export const localConfig: IConfig = {
	applicationURL: `http://localhost:7748`,
	apiGatewayURL: `http://localhost:8080/pishop-backend`,
};

export const appConfig = localConfig;
