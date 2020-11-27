import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Counter } from "./features/counter/Counter";
import { useAppDispatch } from "app/store";
import { initRouters, selectData } from "features/routers/routerSlice";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useSelector(selectData);

  useEffect(() => {
    dispatch(initRouters());
  }, [dispatch]);

  return (
    <div className="App">
      <Counter />
      <pre>
        <code>{JSON.stringify(data, null, 4)}</code>
      </pre>
    </div>
  );
};
