import React, { ReactElement } from "react";
import { RemoteData, Router } from "Core";
import { useSelector } from "react-redux";
import { selectRouterList } from "../slices";
import { Loading, Failed, RouterList } from ".";

export const Root: React.FC = () => {
  const data = useSelector(selectRouterList);

  return RemoteData.fold<string, Router[], ReactElement | null>({
    notAsked: () => null,
    loading: () => <Loading />,
    failed: (error) => <Failed error={error} />,
    success: (routers) => <RouterList routers={routers} />,
  })(data);
};
