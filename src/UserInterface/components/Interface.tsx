import React, { useContext } from "react";
import styled from "styled-components";
import { RemoteData } from "Core/Language";
import { toggleInterface } from "UserInterface/slices";
import { useAppDispatch } from "UserInterface/setup/store";
import { RouterRepositoryContext } from "UserInterface/setup/RouterRepositoryContext";
import { InterfaceInfo, Interface as InterfaceType } from "Core";
import { Button } from "./Button";

interface Props {
  data: InterfaceType;
  routerId: string;
}

export const Interface: React.FC<Props> = ({ data, routerId }) => {
  const dispatch = useAppDispatch();
  const routerRepository = useContext(RouterRepositoryContext);

  return (
    <Container>
      <Title>
        {RemoteData.isFailed(data.info) && "!!"} {data.id}
      </Title>
      <UpButton
        data={data}
        cb={() =>
          dispatch(toggleInterface(routerRepository, routerId, data.id))
        }
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;

const Title = styled.span`
  align-self: center;
  font-size: 16px;
`;

interface UpButtonProps {
  data: InterfaceType;
  cb(): void;
}

const UpButton: React.FC<UpButtonProps> = ({ data, cb }) => {
  return RemoteData.fold<string, InterfaceInfo, JSX.Element | null>({
    notAsked: () => null,
    loading: () => <Button small>...</Button>,
    failed: () => null,
    success: ({ up }) => (
      <Button small onClick={cb}>
        {up ? "UP" : "DOWN"}
      </Button>
    ),
  })(data.info);
};
