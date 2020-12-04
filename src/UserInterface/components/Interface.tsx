import React, { useContext } from "react";
import styled from "styled-components";
import { RemoteData } from "Core/Language";
import {
  Interface as InterfaceType,
  toggleInterface,
} from "UserInterface/slices";
import { useAppDispatch } from "UserInterface/store";
import { RouterRepositoryContext } from "UserInterface/RouterRepositoryContext";
import { InterfaceInfo } from "Core";

interface Props {
  data: InterfaceType;
  routerId: string;
}

export const Interface: React.FC<Props> = ({ data, routerId }) => {
  const dispatch = useAppDispatch();
  const routerRepository = useContext(RouterRepositoryContext);

  return (
    <div>
      {RemoteData.isFailed(data.info) && "!!"}
      <span>{data.id}</span>
      <UpButton
        data={data}
        cb={() =>
          dispatch(toggleInterface(routerRepository, routerId, data.id))
        }
      />
    </div>
  );
};

interface UpButtonProps {
  data: InterfaceType;
  cb(): void;
}

const UpButton: React.FC<UpButtonProps> = ({ data, cb }) => {
  return RemoteData.fold<string, InterfaceInfo, JSX.Element | null>({
    notAsked: () => null,
    loading: () => <Button>...</Button>,
    failed: () => null,
    success: ({ up }) => <Button onClick={cb}>{up ? "UP" : "DOWN"}</Button>,
  })(data.info);
};

const Button = styled.button``;
