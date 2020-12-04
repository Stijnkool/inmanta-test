import React, { useContext } from "react";
import styled from "styled-components";
import {
  useAppDispatch,
  closeAll,
  openAllWithFetch,
  RouterRepositoryContext,
} from "UserInterface";
import { Router } from "./Router";
import { Button } from "./Button";
import { Router as RouterType } from "Core";

interface Props {
  routers: RouterType[];
}

export const RouterList: React.FC<Props> = ({ routers }) => {
  const dispatch = useAppDispatch();
  const routerRepository = useContext(RouterRepositoryContext);

  return (
    <Container>
      <Options>
        <StyledButton
          onClick={() => dispatch(openAllWithFetch(routerRepository))}
        >
          Open All
        </StyledButton>
        <StyledButton onClick={() => dispatch(closeAll())}>
          Close All
        </StyledButton>
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

const StyledButton = styled(Button)`
  margin: 0 8px;
`;
