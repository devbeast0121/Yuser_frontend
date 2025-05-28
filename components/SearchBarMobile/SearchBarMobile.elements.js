//import { SP } from 'next/dist/next-server/lib/utils';
import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MainContainer = styled.div`
    display: flex;
    height: 70px;
    max-width: 700px;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor.color};
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    padding-right: ${SPACING.medium}px;
    padding-left: ${SPACING.medium}px;
`;

export const SearchBarContainer = styled.div`
    display: flex;
    flex:1;
    background-color: ${({ theme }) => theme.name == "light" ? COLORS.whiteMedium : COLORS.blackMedium};
    height: 44px;
    align-items: center;
    border-radius: 21px;
    flex-direction: row;
`;

export const TextInput = styled.input`
    display: flex;
    width: 100%;
    align-items: flex-start;
    background-color: transparent;
    margin-left: 10px;
    border: none;
    outline: none;  // need?
    line-height: 40px;
    height: 40px;

    @media screen and (max-width: 960px){
       max-width: 100%;
       margin-left: ${SPACING.small}px;
       margin-right: ${SPACING.small}px;
    }
`;

export const IconContainer = styled.div`
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
`;

export const BtnClose = styled.div`
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const OverlayContainerSearch = styled.div`
    flex-direction: column;
    width: 343px;
    height:370px;
    background: #141A26;
    border-radius: 5px;
    position:absolute;  
    top:0px;
    @media screen and (max-width: 700px){
        width: 343px;
    }
    @media screen and (max-width: 480px){
       margin-left: 0px;
       margin-right: 0px;
    }
`;