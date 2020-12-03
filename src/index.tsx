import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyle, RootProvider } from "UserInterface";
import { RemoteRouterRepository } from "Infrastructure";
import { RouterRepositoryContext } from "UserInterface";
import {
  Details,
  DetailsProvider,
  Failed,
  Loading,
  Router,
  RouterProvider,
} from "UserInterface/components";

const API_URL = "http://0.0.0.0:8080";

const routerRepository = new RemoteRouterRepository(API_URL);

ReactDOM.render(
  <React.StrictMode>
    <RouterRepositoryContext.Provider value={routerRepository}>
      <GlobalStyle />
      <RootProvider
        Loading={Loading}
        Failed={Failed}
        Success={({ routers }) => (
          <RouterProvider
            routers={routers}
            Router={(props) => (
              <Router
                {...props}
                DetailsProvider={(props) => (
                  <DetailsProvider {...props} Details={Details} />
                )}
              />
            )}
          />
        )}
      />
    </RouterRepositoryContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
