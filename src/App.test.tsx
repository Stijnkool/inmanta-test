import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { App } from "./App";
import { initRouters } from "features/routers/routerSlice";
import { InMemoryRouterRepository } from "Infrastructure";

const Component = (
  <Provider store={store}>
    <App />
  </Provider>
);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(Component, div);
});

it("renders cloud router", async () => {
  const { getByText } = render(Component);

  await store.dispatch(initRouters(new InMemoryRouterRepository()));

  expect(getByText("cloud1")).toBeInTheDocument();
});
