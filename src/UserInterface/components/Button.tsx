import styled from "styled-components";
import { colors } from "UserInterface/styles/colors";

interface Props {
  small?: boolean;
}

export const Button = styled.button<Props>`
  cursor: pointer;
  padding: ${(p) => (p.small ? "4px" : "8px")};
  font-size: ${(p) => (p.small ? "14px" : "16px")};
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
