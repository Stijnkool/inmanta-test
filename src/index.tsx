import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyle, RootProvider } from "UserInterface";
import { RemoteRouterRepository } from "Infrastructure";
import { ServiceBundle, ServiceContext } from "UserInterface";
import { Failed, Loading, RouterProvider } from "UserInterface/components";

const API_URL = "http://0.0.0.0:8080/";

const serviceBundle: ServiceBundle = {
  routerRepository: new RemoteRouterRepository(API_URL),
};

ReactDOM.render(
  <React.StrictMode>
    <ServiceContext.Provider value={serviceBundle}>
      <GlobalStyle />
      <RootProvider
        Loading={Loading}
        Failed={Failed}
        Success={RouterProvider}
      />
    </ServiceContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
