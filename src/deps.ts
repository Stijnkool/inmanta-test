import { RemoteRouterRepository } from "Infrastructure/RemoteRouterRepository";

const API_URL = "http://0.0.0.0:8080/";
export const routerRepository = new RemoteRouterRepository(API_URL);
