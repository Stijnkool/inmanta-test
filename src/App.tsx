import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectData } from "features/routers/routerSlice";
import { RemoteData } from "Core/Language";
import { Router } from "UserInterface/components";

export const App: React.FC = () => {
  const data = useSelector(selectData);

  if (!RemoteData.isSuccess(data)) return null;
  const routers = data.value;

  return (
    <Container>
      {routers.map((router) => (
        <Router key={router} name={router} onClick={() => {}} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
`;
