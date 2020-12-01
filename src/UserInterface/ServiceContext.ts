import React from "react";
import { InMemoryRouterRepository } from "Infrastructure";
import { RouterRepository } from "Core";

export interface ServiceBundle {
  routerRepository: RouterRepository;
}

export const ServiceContext = React.createContext<ServiceBundle>({
  routerRepository: new InMemoryRouterRepository(),
});
