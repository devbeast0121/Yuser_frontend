import styled from "styled-components";
import { COLORS, SPACING } from "../../styles/Styling.js";

export const ModalContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: ${props => props.position == "vertical" ? props.theme.colorGrey.color : props.theme.containerSecondary.color};
    border: ${props => props.position == "vertical" ? "2px solid props.theme.borderColor.color" : "none"};
    border-radius: ${props => props.position == "vertical" ? 10 : 0}px;
    position: absolute;
    right: ${props => props.position == "vertical" ? "70px" : "none"};
    bottom: ${props => props.position == "vertical" ? "0px" : "none"};
    left: ${props => props.position == "vertical" ? "none" : "none"};
    top:${props => props.position == "vertical" ? "none" : "-15px"};
    z-index: 999;
    height: ${props => props.position == "vertical" ? "auto" : "85px"};

    @media screen and (max-width: 420px){
        height: auto;
    } 
`;

export const MainContainer = styled.div`
    flex-direction: row;
    padding-top: ${props => props.position == "vertical" ? SPACING.small : 0}px;
    padding-bottom: ${props => props.position == "vertical" ? SPACING.small : 0}px;
    border-bottom-width: ${props => props.position == "horizontal" ? "none" : props.lastItem ? "none" : "2px"};
    border-bottom-style: ${props => props.position == "horizontal" ? "none" : props.lastItem? "none" : "solid"};
    border-bottom-color: ${props => props.position == "horizontal" ? "none" : props.lastItem? "none" : props.theme.borderColor.color};

    @media screen and (max-width: 420px){
        margin-bottom: ${props => props.position == "vertical" ? 0 : 12}px;
    }
`;

export const ShareContainer = styled.div`
    display: flex;
    height: 100%;
    flex-direction: ${props => props.position == "vertical" ? "column" : "row"};
    width: 100%;
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: ${props => props.position == "vertical" ? SPACING.medium : 0}px; 
    padding-right: ${props => props.position == "vertical" ? SPACING.medium : 0}px; 
    overflow: auto;
  
    ::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
        display: none;
    }

     @media screen and (max-width: 420px){
        min-width: ${props => props.position == "vertical" ? 326 : 336}px;
        display: flex;
        flex-wrap: wrap;
    }

    @media screen and (max-width: 390px){
        min-width: ${props => props.position == "vertical" ? 326 : 280}px;
    }
`;

export const IconTextContainer = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: ${props => props.position == "vertical" ? 0 : SPACING.small}px;
    padding-right: ${props => props.position == "vertical" ? 0 : SPACING.small}px;
`;

export const TxtShare = styled.p`
    font-size: 18px; 
    color: ${({ theme }) => theme.textPrimary.color};
    padding-left: 5px;
    white-space: nowrap;
`;

export const IconBackgroundWrapper = styled.div`
    border-radius: 50%; 
    height: ${props => props.position == "vertical" ? 34 : 42}px;
    width: ${props => props.position == "vertical" ? 34 : 42}px;
   // background-color:  ${props => props.theme.name == 'light' ? COLORS.black20 : "transparent"};
    background-color:  ${props => props.theme.name == 'dark' && props.position == "vertical" ? "transparent" : COLORS.black20 };
    justify-content: center; 
    align-Items: center; 
`;
