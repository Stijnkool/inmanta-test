import React, { useContext } from "react";
import { RouterRepositoryContext } from "UserInterface/RouterRepositoryContext";
import {
  closeAll,
  openAllWithFetch,
  Router as RouterType,
} from "UserInterface/slices";
import { useAppDispatch } from "UserInterface/store";
import { Router } from "./Router";

interface Props {
  routers: RouterType[];
}

export const RouterList: React.FC<Props> = ({ routers }) => {
  const dispatch = useAppDispatch();
  const routerRepository = useContext(RouterRepositoryContext);

  return (
    <div>
      <button onClick={() => dispatch(openAllWithFetch(routerRepository))}>
        Open All
      </button>
      <button onClick={() => dispatch(closeAll())}>Close All</button>
      {routers.map((router) => (
        <Router router={router} key={router.id} />
      ))}
    </div>
  );
};
