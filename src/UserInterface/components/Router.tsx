import React from "react";
import styled from "styled-components";
import { RouterProps } from "./RouterProvider";

export interface DetailsProviderProps {
  router: string;
  open: boolean;
}

interface Props extends RouterProps {
  DetailsProvider: React.FC<DetailsProviderProps>;
}

export const Router: React.FC<Props> = ({
  name,
  open,
  onClick,
  DetailsProvider,
}) => (
  <Container onClick={onClick}>
    {name}
    <span>{open ? "open" : "closed"}</span>
    <DetailsProvider open={open} router={name} />
  </Container>
);

const Container = styled.div`
  cursor: pointer;
  padding: 16px;
  border-bottom: 1px solid rgba(200, 200, 200, 0.5);

  :last-child {
    border-bottom: none;
  }
`;
