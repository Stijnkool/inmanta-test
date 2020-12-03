import {
  FailedRouterRepository,
  LoadingRouterRepository,
  SuccessRouterRepository,
} from "Infrastructure";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Root, RouterRepositoryContext, store } from "UserInterface";
import { initRouters } from "./slices";

let container: any = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    div
  );
});

it("renders Loading", async () => {
  const routerRepo = new LoadingRouterRepository();
  store.dispatch(initRouters(routerRepo));

  await act(async () => {
    ReactDOM.render(
      <Provider store={store}>
        <RouterRepositoryContext.Provider value={routerRepo}>
          <Root />
        </RouterRepositoryContext.Provider>
      </Provider>,
      container
    );
  });

  expect(container.textContent).toBe("Loading...");
});

it("renders Failed", async () => {
  const routerRepo = new FailedRouterRepository("failed");
  store.dispatch(initRouters(routerRepo));

  await act(async () => {
    ReactDOM.render(
      <Provider store={store}>
        <RouterRepositoryContext.Provider value={routerRepo}>
          <Root />
        </RouterRepositoryContext.Provider>
      </Provider>,
      container
    );
  });

  expect(container.textContent).toBe("failed");
});

it("renders Success", async () => {
  const routerRepo = new SuccessRouterRepository(["cloud1"], ["eth0"]);
  store.dispatch(initRouters(routerRepo));

  await act(async () => {
    ReactDOM.render(
      <Provider store={store}>
        <RouterRepositoryContext.Provider value={routerRepo}>
          <Root />
        </RouterRepositoryContext.Provider>
      </Provider>,
      container
    );
  });

  expect(container.textContent).toContain("cloud1");
});
