import styled from "styled-components";
import {
  Container,
  SideBarLeft,
  SideBarRight,
} from "../../styles/globalStyles";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-right: 2px solid ${({ theme }) => theme.borderColor.color};
  margin-bottom: ${SPACING.large}px;
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${COLORS.yellow};
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${SPACING.medium}px;
  padding-bottom: ${SPACING.small}px;
  padding-right: ${SPACING.large}px;
  align-items: flex-start;
`;

export const SectionBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${SPACING.medium}px;
`;

export const Name = styled.p`
  line-height: 1.6;
  font-family: "LatoBlack";
  margin-left: ${SPACING.large}px;
  margin-right: ${SPACING.large}px;
`;

export const Comment = styled.p`
  margin-left: ${SPACING.large}px;
  margin-right: ${SPACING.large}px;
`;

export const Date = styled.p`
  color: ${({ theme }) => theme.textSecondary.color};
  font-size: ${FONT_SIZE.small}px;
  font-family: "LatoBlack";
`;

export const DateContainer = styled.div`
  display: flex;
  flex: 1;
  margin-right: ${SPACING.large}px;
  padding-bottom: ${SPACING.medium}px;
  border-bottom: 2px solid ${({ theme }) => theme.borderColor.color};
`;

export const Image = styled.img`
  height: 250px;
  width: 250px;
  border-radius: 10px;
  margin-top: ${SPACING.medium}px;
  margin-left: ${SPACING.large}px;
`;

export const Post = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1px; //progress bar is missing if remove margin-bottom: 1px

  @media screen and (max-width: 900px) {
    align-items: flex-start;
  }
`;

export const PostBody = styled.div`
  display: flex;
  max-width: 640px;
  flex: 1;
  background-color: ${COLORS.blackDark};
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  @media screen and (max-width: 900px) {
    max-width: none;
  }
`;
