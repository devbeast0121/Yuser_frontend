import styled from "styled-components";
import {
  Container,
  SideBarLeft,
  SideBarRight,
} from "../../styles/globalStyles";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const ChatContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column-reverse;
  border-right: 1px solid ${({ theme }) => theme.borderColor.color};
  width: 100%;
  padding-top: ${SPACING.medium}px;
  overflow: auto;
  padding-bottom: ${(props) => props.marginBottom}px;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
    display: none;
  }

  @media screen and (max-width: 400px) {
    min-width: 326px;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  z-index: 1;
`;

export const MainOuterContainer = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  z-index: 1;
`;

export const Date = styled.p`
  opacity: 0.4;
  font-size: ${FONT_SIZE.small}px;
  font-family: "LatoBlack";
`;

export const DateContainer = styled.div`
  display: flex;
  flex: 1;
  padding-bottom: ${SPACING.medium}px;
  padding-left: ${SPACING.medium}px;
  margin-top: ${SPACING.medium}px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor.color};
`;

export const MessageInputBox = styled.div`
  display: flex;
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${(props) => (props.textareaOverlayVisible ? 9999 : 1)};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
