import React, { useContext } from "react";
import styled from "styled-components";
import { colors } from "UserInterface/colors";
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
    <Container>
      <Options>
        <Button onClick={() => dispatch(openAllWithFetch(routerRepository))}>
          Open All
        </Button>
        <Button onClick={() => dispatch(closeAll())}>Close All</Button>
      </Options>

      {routers.map((router) => (
        <Router router={router} key={router.id} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  background: #fff;
  border-radius: 2px;
  margin: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Options = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 8px;
  margin: 0 8px;
  background: none;
  border: 1px solid ${colors.primaryLight};
  color: ${colors.primaryLight};
  border-radius: 2px;
  outline: none;

  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
`;
