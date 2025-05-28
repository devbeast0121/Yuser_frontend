import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: ${SPACING.large}px;
  margin-left: ${SPACING.large}px;
  margin-right: ${SPACING.large}px;
`;

export const Title = styled.p`
  font-size: ${FONT_SIZE.large}px;
  font-family: "LatoBlack";
  margin-bottom: ${SPACING.extraLarge}px;
`;

export const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: ${SPACING.large}px;
  margin-bottom: ${SPACING.large}px;
  border-bottom: 2px solid ${({ theme }) => theme.borderColor.color};
`;

export const Content = styled.p`
  line-height: 1.3;
  font-size: 18px;
  cursor: pointer;
`;

export const UserName = styled.span`
  line-height: 1.3;
  font-size: 18px;
  font-family: "LatoBlack";
`;

export const ContentBox = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

export const ActionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${SPACING.large}px;
  cursor: pointer;
`;

export const Post = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 5px;
  display: ${(props) => (props.post === null ? "none" : "initial")};
`;
