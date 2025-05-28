import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const NavBox = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 12px;
  padding-left: 12px;
  padding-right: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: unset;
  flex-wrap: wrap;
  background-color: ${(props) =>
    props.protocol ? "transparent" : ({ theme }) => theme.container.color};

  @media screen and (max-width: 750px) {
    overflow: hidden;
  }
`;

export const NavButton = styled.div`
  display: flex;
  cursor: pointer;
  margin-bottom: 12px;
`;

export const ButtonTitle = styled.p`
  padding-left: ${SPACING.large}px;
  padding-right: ${SPACING.large}px;
  font-family: ${(props) => (props.active ? "LatoBlack" : "LatoRegular")};
  font-size: 16px;
`;

export const Divider = styled.div`
  display: flex;
  height: 20px;
  width: 2px;
  border-radius: 1px;
  align-self: center;
  margin-bottom: 12px;
  background-color: ${({ theme }) => theme.borderColor.color};
`;

export const Alink = styled.a`
  text-decoration: none;
  opacity: 0.7;
  :link {
    color: ${({ theme }) => theme.textSecondary.color};
  }

  :visited {
    color: ${({ theme }) => theme.textSecondary.color};
  }

  :hover {
    opacity: 0.4;
    color: ${({ theme }) => theme.textSecondary.color};
  }

  :active {
    opacity: 0.4;
    color: ${({ theme }) => theme.textSecondary.color};
  }
`;
