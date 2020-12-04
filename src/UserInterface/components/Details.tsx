import React from "react";
import { RemoteData } from "Core/Language";
import { Failed } from "./Failed";
import { Loading } from "./Loading";
import { InterfaceList } from "./InterfaceList";

interface Props {
  routerId: string;
  interfaces: RemoteData.Type<string, string[]>;
}

export const Details: React.FC<Props> = ({ routerId, interfaces }) => {
  return RemoteData.fold<string, string[], JSX.Element | null>({
    notAsked: () => null,
    loading: () => <Loading />,
    failed: (error) => <Failed error={error} />,
    success: (interfaces) => (
      <>
        <button>PING</button>
        <InterfaceList routerId={routerId} />
      </>
    ),
  })(interfaces);
};
