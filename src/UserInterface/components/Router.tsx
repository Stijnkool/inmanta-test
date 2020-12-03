import React from "react";
import styled from "styled-components";

interface Props {
  name: string;
  open: boolean;
  onClick(): void;
}

export const Router: React.FC<Props> = ({ name, open, onClick }) => (
  <Container onClick={onClick}>
    {name}
    <span>{open ? "open" : "closed"}</span>
  </Container>
);

const Container = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgba(200, 200, 200, 0.5);

  :last-child {
    border-bottom: none;
  }
`;
