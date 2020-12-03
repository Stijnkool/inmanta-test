import {
  FailedRouterRepository,
  LoadingRouterRepository,
  SuccessRouterRepository,
} from "Infrastructure";
import React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { RootProvider, ServiceContext } from "UserInterface";

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

const Empty: React.FC<any> = () => null;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <RootProvider Loading={Empty} Failed={Empty} Success={Empty} />,
    div
  );
});

it("renders Loading", async () => {
  await act(async () => {
    ReactDOM.render(
      <ServiceContext.Provider
        value={{ routerRepository: new LoadingRouterRepository() }}
      >
        <RootProvider
          Loading={() => <div>loading</div>}
          Failed={Empty}
          Success={Empty}
        />
      </ServiceContext.Provider>,
      container
    );
  });

  expect(container.textContent).toBe("loading");
});

it("renders Failed", async () => {
  await act(async () => {
    ReactDOM.render(
      <ServiceContext.Provider
        value={{ routerRepository: new FailedRouterRepository("failed") }}
      >
        <RootProvider
          Loading={Empty}
          Failed={({ error }) => <div>{error}</div>}
          Success={Empty}
        />
      </ServiceContext.Provider>,
      container
    );
  });

  expect(container.textContent).toBe("failed");
});

it("renders Success", async () => {
  await act(async () => {
    ReactDOM.render(
      <ServiceContext.Provider
        value={{ routerRepository: new SuccessRouterRepository(["cloud1"]) }}
      >
        <RootProvider
          Loading={Empty}
          Failed={Empty}
          Success={({ routers }) => <>{routers[0]}</>}
        />
      </ServiceContext.Provider>,
      container
    );
  });

  expect(container.textContent).toBe("cloud1");
});
