import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const DropDownMain = styled.div`
    display: flex;
    position: absolute;
    top: 3px;
    left:  60px;
    z-index: 99;
    flex: 1; 
    flex-direction: column;
    align-items: flex-end;
`;

export const DropDownHeader = styled.div`
    height: 40px;
    width: 150px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background-color: ${({ theme }) => theme.name == "light" ? COLORS.whiteMedium : COLORS.blackDarkMedium};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border: 1px solid ${({ theme }) => theme.borderColor.color};
    font-family: 'LatoBlack';
    padding-right: ${SPACING.medium}px;
    font-size:16px;
    //background-color: ${COLORS.black20};

    @media screen and (max-width: 550px){  
        width: 120px;
    }
   
`;

export const DropDownList = styled.ul`
    width: 150px;
    background: ${({ theme }) => theme.name == "light" ? COLORS.whiteMedium : COLORS.blackDarkMedium};
    border: 1px solid ${({ theme }) => theme.borderColor.color};
    box-sizing: border-box;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    position: absolute;
    z-Index: 999;
    margin-top: 40px;
    padding-top: ${SPACING.small}px;
    padding-bottom: ${SPACING.small}px;
`;

export const ListItem = styled.li`
    list-style: none;
    align-items: center;
    padding-top: ${SPACING.small}px;
    padding-bottom: ${SPACING.small}px;
    padding-left: ${SPACING.medium}px;
    cursor: pointer;
    font-size:16px;

    &:hover {
        background: ${({ theme }) => theme.name == "light" ? COLORS.black20 : COLORS.greyMedium};
    }
`;

export const HederText = styled.p`
    padding-top: ${SPACING.small}px;
    padding-bottom: ${SPACING.small}px;
    padding-left: ${SPACING.medium}px;
    font-size: 16px;
    font-family: "LatoBlack";
`;