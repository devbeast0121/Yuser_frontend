import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  padding-top: ${SPACING.large}px;
  padding-right: ${SPACING.large}px;
  padding-left: ${SPACING.large}px;
`;

export const TitleContainer = styled.div`
    height: 50px;
    max-width:  100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${SPACING.medium}px;
`;

export const WalletsContainer = styled.div`
    max-width: 100%;
    padding-bottom: ${SPACING.medium}px;
    overflow: hidden;
`;

export const TitleMedium = styled.div`
    width: 100%;
    height: 100%;
    margin-left: ${SPACING.large}px;
    margin-right: ${SPACING.large}px;
    justify-content: center;
    align-items: center;
    font-size: ${FONT_SIZE.medium}px;
    font-family:'LatoBlack';
    border-radius: 5px;
    border: 2px solid ${({ theme }) => theme.borderColor.color};
`;

export const TitleLarge = styled.p`
    font-size: ${FONT_SIZE.large}px;
    font-family: 'Rubik', "LatoBlack", sans-serif;
    margin-bottom: ${SPACING.medium}px;
    margin-right: ${SPACING.small}px;
    text-align: left;
`;

export const ColumnBox = styled.div`
   flex: 1;
   flex-direction: column;
`;

export const RowBox = styled.div`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

export const TxtSmall = styled.p`
    font-size: ${FONT_SIZE.small}px;
    color:${({ theme }) => theme.textSecondary.color};
    margin-bottom: ${SPACING.small}px;
`;

export const Squere = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: ${props => props.color ? props.theme.inactiveColor.color : COLORS.violet};
    margin-right: ${SPACING.small}px;
`;

export const Container = styled.div`
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
`;

export const TxtLarge = styled.p`
    font-size: ${FONT_SIZE.large}px;
    color:${({ theme }) => theme.textPrimary.color};
    margin-left: ${SPACING.small}px;
`;

export const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: ${SPACING.large}px;

  @media screen and (max-width: 700px){
    margin-top: 0px;
}
`;
 export const Text = styled.p`
    font-size: ${FONT_SIZE.large}px;
    color:${({ theme }) => theme.textPrimary.color};
    margin-top: ${SPACING.large}px;
    justify-content: center;
    align-items: center;
`;