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
    <Container>
      <TitleBar onClick={clickHandler}>
        <Title>{router.id}</Title>
        <Toggle>{router.open ? "∧" : "∨"} </Toggle>
      </TitleBar>
      {router.open && (
        <Details routerId={router.id} interfaces={router.interfaces} />
      )}
    </Container>
  );
};

const Container = styled.div`
  border-top: 1px solid rgba(200, 200, 200, 0.5);
`;

const Title = styled.span`
  font-size: 16px;
  align-self: center;
`;

const TitleBar = styled.div`
  padding: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const Toggle = styled.span`
  width: 16px;
  border: none;
  font-size: 18px;
  padding: 8px;
  background: none;
  box-sizing: content-box;
  user-select: none;
`;
