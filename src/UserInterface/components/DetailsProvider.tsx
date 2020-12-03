import { RemoteData } from "Core/Language";
import React, { useContext, useEffect, useState } from "react";
import { RouterRepositoryContext } from "UserInterface/RouterRepositoryContext";
import { Failed } from "./Failed";
import { Loading } from "./Loading";

interface Props {
  router: string;
  open: boolean;
  Details: React.FC<{ interfaces: string[] }>;
}

export const DetailsProvider: React.FC<Props> = ({ router, open, Details }) => {
  const [data, setData] = useState<RemoteData.Type<string, string[]>>(
    RemoteData.notAsked()
  );
  const routerRepository = useContext(RouterRepositoryContext);

  useEffect(() => {
    if (!RemoteData.isNotAsked(data)) return;
    setData(RemoteData.loading());
    fetchData();

    async function fetchData() {
      const result = await routerRepository.getInterfaces(router);
      setData(RemoteData.fromEither(result));
    }
  }, [data, routerRepository, router]);

  return RemoteData.fold<string, string[], JSX.Element | null>({
    notAsked: () => null,
    loading: () => <Loading />,
    failed: (error) => <Failed error={error} />,
    success: (interfaces) => <Details interfaces={interfaces} />,
  })(data);
};
