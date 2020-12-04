import React from "react";
import styled from "styled-components";
import { RemoteData } from "Core/Language";
import { Failed } from "./Failed";
import { Loading } from "./Loading";
import { InterfaceList } from "./InterfaceList";
import { Button } from "./Button";

interface Props {
  routerId: string;
  interfaces: RemoteData.Type<string, string[]>;
}

export const Details: React.FC<Props> = ({ routerId, interfaces }) => {
  const content = RemoteData.fold<string, string[], JSX.Element | null>({
    notAsked: () => null,
    loading: () => <Loading />,
    failed: (error) => <Failed error={error} />,
    success: (interfaces) => (
      <>
        <PingBar>
          <Button small>PING</Button>
        </PingBar>
        <InterfaceList routerId={routerId} />
      </>
    ),
  })(interfaces);

  return <Container>{content}</Container>;
};

const Container = styled.div`
  padding: 0 16px 16px;
`;

const PingBar = styled.div`
  display: flex;
  justify-content: center;
`;
