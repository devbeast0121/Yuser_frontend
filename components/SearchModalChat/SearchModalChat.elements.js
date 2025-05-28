import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const ModalContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.containerSecondary.color};
    position: relative;
    position: absolute;
    z-index: 999;
    top: 68px; 
    left: 0px; 
    right: 0px; 
`;

export const ChatBox = styled.div`
    flex-direction: row;
    justify-content: flex-start;
    align-items:center;
    padding: ${SPACING.medium}px;
    border-bottom:1px solid ${({ theme }) => theme.borderColor.color};
`;

export const BtnClose = styled.div`
    border-radius: 50%;
    background-color: ${COLORS.blackDarkMedium};
    position: absolute;
    z-index: 999;
    top: ${SPACING.medium}px;
    right: ${SPACING.medium}px;
    cursor: pointer;
    height: 40px;
    width: 40px;
    align-items: center;
    justify-content: center;
`;

export const ChatContainer = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column-reverse;
    //border-right: 1px solid ${COLORS.border};
    width: 100%;
    padding-top: ${SPACING.medium}px;
    padding-left: ${SPACING.medium}px;
    overflow: auto;
  
    ::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
        display: none;
    }

    @media screen and (max-width: 400px){
      min-width: 326px;
    } 
`;

export const MainContainer = styled.div`
    flex: 1;
    display: flex;
    width: 100%;
    flex-direction: column;
    border-top: 2px solid ${COLORS.border};
    padding-bottom: 40px;
`;

export const DateContainer = styled.div`
    display: flex;
    flex: 1;
    padding-bottom: ${SPACING.medium}px;
    max-width: 200px;
    margin-top: -30px;
`;

export const Date = styled.p`
   color: ${COLORS.whiteLight};
   font-size: ${FONT_SIZE.small}px;
   font-family: "LatoBlack";
`;

export const Backdrop = styled.div`
    position: fixed;
    z-index: 1040;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: 0.5;
`;
export const Name = styled.p`
    font-family: "LatoBlack";
    margin-left: ${SPACING.small}px;
`;
