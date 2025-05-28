//import { SP } from 'next/dist/next-server/lib/utils';
import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const MainContainer = styled.div`
  display: flex;
  max-width: 700px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor.color};
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  padding-top: ${SPACING.medium}px;
  padding-bottom: ${SPACING.medium}px;
  background-color: ${({ theme }) => theme.container.color};
`;

export const SearchBarContainer = styled.div`
  display: flex;
  flex: 1;
  height: 44px;
  align-items: center;
  border-radius: 21px;
  flex-direction: row;
  padding-left: ${SPACING.medium}px;
`;

export const TextInput = styled.input`
  width: 100%;
  align-items: flex-start;
  background-color: transparent;
  margin-left: 10px;
  border: none;
  outline: none; // need?
  line-height: 36px;
  height: 40px;
  caret-color: ${({ theme }) => theme.placeholder.color} !important;
  color: ${({ theme }) => theme.textSecondary.color};

  &::placeholder {
    color: ${({ theme }) => theme.placeholder.color};
  }

  @media screen and (max-width: 960px) {
    max-width: 100%;
    margin-left: ${SPACING.small}px;
    margin-right: ${SPACING.large}px;
  }
`;

export const BtnClose = styled.div`
  margin-left: ${SPACING.medium}px;
  margin-right: ${SPACING.medium}px;
  cursor: pointer;
  border:0;
  background:transparent;
`;
