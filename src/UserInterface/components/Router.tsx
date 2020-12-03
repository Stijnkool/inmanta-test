import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { RouterRepositoryContext } from "UserInterface/RouterRepositoryContext";
import { toggleWithFetch } from "UserInterface/slices";
import { useAppDispatch } from "UserInterface/store";
import { Router as RouterType } from "UserInterface/slices";
import { Details } from "./Details";

interface Props {
  router: RouterType;
}

export const Router: React.FC<Props> = ({ router }) => {
  const dispatch = useAppDispatch();
  const routerRepository = useContext(RouterRepositoryContext);

  const clickHandler = useCallback(
    () => dispatch(toggleWithFetch(routerRepository, router.id)),
    [dispatch, routerRepository, router]
  );

  return (
    <Container onClick={clickHandler}>
      {router.id}
      <span>{router.open ? "open" : "closed"}</span>
      {router.open && (
        <Details routerId={router.id} interfaces={router.interfaces} />
      )}
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  padding: 16px;
  border-bottom: 1px solid rgba(200, 200, 200, 0.5);

  :last-child {
    border-bottom: none;
  }
`;
