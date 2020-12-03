import React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { RootProvider } from "UserInterface";

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

it.skip("renders cloud router", async () => {
  const div = document.createElement("div");

  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(
      <RootProvider
        Loading={Empty}
        Failed={Empty}
        Success={({ routers }) => <>{JSON.stringify(routers)}</>}
      />,
      container
    );
  });

  expect(container.textContent).toBe("cloud1");

  // const div2 = div.querySelector("[data-test-id]");

  // console.log({ div2, div });
  // const label = container.querySelector('p');
  // expect(label.textContent).toBe('You clicked 0 times');
  // expect(document.title).toBe('You clicked 0 times');

  // // Test second render and componentDidUpdate
  // act(() => {
  //   button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  // });
  // expect(label.textContent).toBe('You clicked 1 times');
  // expect(document.title).toBe('You clicked 1 times');

  // act(() => {
  //   const { getByText } = render(Component);
  // });

  // expect(getByText("cloud1")).toBeInTheDocument();
});
