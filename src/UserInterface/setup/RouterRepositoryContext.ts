import React from "react";
import { SuccessRouterRepository } from "Infrastructure";
import { RouterRepository } from "Core";

const info = { up: false, mtu: 1600, address: [] };

export const RouterRepositoryContext = React.createContext<RouterRepository>(
  new SuccessRouterRepository(["defaultRouter"], ["defaultInterface"], info)
);
