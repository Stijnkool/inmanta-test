import React from "react";
import { SuccessRouterRepository } from "Infrastructure";
import { RouterRepository } from "Core";

export interface ServiceBundle {
  routerRepository: RouterRepository;
}

export const ServiceContext = React.createContext<ServiceBundle>({
  routerRepository: new SuccessRouterRepository(["fake"]),
});
