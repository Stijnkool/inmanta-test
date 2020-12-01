import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { RemoteRouterRepository } from "Infrastructure";
import { ServiceBundle, ServiceContext } from "UserInterface";
import { initRouters } from "features/routers/routerSlice";

const API_URL = "http://0.0.0.0:8080/";

const serviceBundle: ServiceBundle = {
  routerRepository: new RemoteRouterRepository(API_URL),
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ServiceContext.Provider value={serviceBundle}>
        <App />
      </ServiceContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

store.dispatch(initRouters(serviceBundle.routerRepository));
