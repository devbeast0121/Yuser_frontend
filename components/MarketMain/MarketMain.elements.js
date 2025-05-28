import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const MainMarketContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmptyBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;

  @media screen and (max-width: 991px) {
    display: none;
  }
`;

export const Make = styled.div`
  display: flex;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 24px;
  padding-left: 24px;
  padding-right: 24px;
  width: 100%;
`;

export const DropDownWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  margin-left: ${SPACING.large}px;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 950px) {
    margin-left: 0px; 
  }
`;

export const DropDownHeader = styled.div`
  display: flex;
  height: 40px;
  width: 150px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme.name == "light" ? COLORS.whiteMedium : COLORS.blackDarkMedium};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: ${(props) => (props.dropDownOpen ? 0 : 10)}px;
  border-bottom-right-radius: ${(props) => (props.dropDownOpen ? 0 : 10)}px;
  border: 1px solid ${({ theme }) => theme.borderColor.color};
  font-family: "LatoBlack";
  padding-left: ${SPACING.medium}px;
  padding-right: ${SPACING.medium}px;
  font-size: 16px;

  @media screen and (max-width: 550px) {
    width: 120px;
  }
`;

export const DropDownList = styled.ul`
  width: 150px;
  background: ${({ theme }) =>
    theme.name == "light" ? COLORS.whiteMedium : COLORS.blackDarkMedium};
  border: 1px solid ${({ theme }) => theme.borderColor.color};
  box-sizing: border-box;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  z-index: 999;
  top: 65px;
  padding-top: ${SPACING.small}px;
  padding-bottom: ${SPACING.small}px;

  @media screen and (max-width: 950px) {
    top: 120px;
  }

  @media screen and (max-width: 950px) {
    top: 180px;
  }

  @media screen and (max-width: 550px) {
    width: 120px;
  }

  @media screen and (max-width: 950px) {
    top: 120px;
  }
`;

export const ListItem = styled.li`
  list-style: none;
  align-items: center;
  padding-top: ${SPACING.small}px;
  padding-bottom: ${SPACING.small}px;
  padding-left: ${SPACING.medium}px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: ${({ theme }) => theme.greyButton.color};
  }
`;

export const ResultsSortFilterContainer = styled.div`
  display: flex;
  flex; 1;
  padding-left: ${SPACING.large}px;
  padding-right: ${SPACING.large}px;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: 950px) {
    flex-direction: column;
  }

  @media screen and (max-width: 700px) {
    padding-right: ${SPACING.large}px;
    padding-left: ${SPACING.large}px;
  }
`;

export const TxtResult = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "LatoBlack";
  white-space: nowrap;
  margin-left: ${SPACING.large}px; 

  @media screen and (max-width: 950px) {
    margin-left: 0px; 
  }
`;

export const SubBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
`;
