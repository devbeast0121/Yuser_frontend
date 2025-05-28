import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const MainContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.borderColor.color};
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TopBox = styled.div`
display: flex;
    flex: 1, 
    flex-direction: row;
    justify-content: space-between; 
    padding: ${SPACING.large}px;
    width: 100%;
`;

export const MiddleBox = styled.div`
display: flex;
    flex: 1, 
    flex-direction: column;
    justify-content: flex-start; 
    width: 100%;
`;

export const BottomBox = styled.div`
display: flex; 
    flex: 1, 
    flex-direction: row;
    justify-content: flex-start;
    padding: ${SPACING.large}px;
    width: 100%;
`;

export const TitleText = styled.p`
  color: ${({ theme }) => theme.textSecondary.color};
`;

export const NumberText = styled.p`
  font-size: ${FONT_SIZE.extraLarge}px;
  font-family: "LatoBlack";
  padding-left: ${SPACING.large}px;
`;

export const DataText = styled.p`
  padding-right: 4px;
  color: ${({ theme }) => theme.textSecondary.color};
`;

export const Wrapper = styled.div`
  display: flex;
  transform: rotateX(180deg);
`;

export const Button = styled.button`
  background: none;
  border: none;
`;
