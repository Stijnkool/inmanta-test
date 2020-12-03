import React from "react";
import { SuccessRouterRepository } from "Infrastructure";
import { RouterRepository } from "Core";

export const RouterRepositoryContext = React.createContext<RouterRepository>(
  new SuccessRouterRepository(["defaultRouter"], ["defaultInterface"])
);
