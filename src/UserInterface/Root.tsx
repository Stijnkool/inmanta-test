import React, { ReactElement } from "react";
import { RemoteData } from "Core/Language";
import { useSelector } from "react-redux";
import { Router, selectRouterList } from "./slices";
import { Loading, Failed, RouterList } from "./components";

export const Root: React.FC = () => {
  const data = useSelector(selectRouterList);

  return RemoteData.fold<string, Router[], ReactElement | null>({
    notAsked: () => null,
    loading: () => <Loading />,
    failed: (error) => <Failed error={error} />,
    success: (routers) => <RouterList routers={routers} />,
  })(data);
};
