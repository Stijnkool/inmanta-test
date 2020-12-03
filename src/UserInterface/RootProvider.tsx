import React, { ReactElement, useContext, useEffect, useState } from "react";
import { RemoteData } from "Core/Language";
import { RouterRepositoryContext } from "UserInterface";

interface Props {
  Loading: React.FC;
  Failed: React.FC<{ error: string }>;
  Success: React.FC<{ routers: string[] }>;
}

export const RootProvider: React.FC<Props> = ({ Loading, Failed, Success }) => {
  const [data, setData] = useState<RemoteData.Type<string, string[]>>(
    RemoteData.notAsked()
  );

  const routerRepository = useContext(RouterRepositoryContext);

  useEffect(() => {
    if (!RemoteData.isNotAsked(data)) return;
    setData(RemoteData.loading());
    fetchData();

    async function fetchData() {
      const result = await routerRepository.getRouters();
      setData(RemoteData.fromEither(result));
    }
  }, [data, routerRepository]);

  return RemoteData.fold<string, string[], ReactElement | null>({
    notAsked: () => null,
    loading: () => <Loading />,
    failed: (error) => <Failed error={error} />,
    success: (routers) => <Success routers={routers} />,
  })(data);
};
