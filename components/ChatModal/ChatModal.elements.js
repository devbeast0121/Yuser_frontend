import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const ModalContainer = styled.div`
    flex: 1;
    display: flex;
    width: 50%;
    max-width: 800px;
    flex-direction: column;
    background-color: ${COLORS.blackDark};
    height: 80%;
    border: 2px solid ${COLORS.border};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    position: relative;
    padding-top: ${SPACING.large}px;
    margin-left: calc(50% - 545px);
    //margin-left: 21.5%;

    @media screen and (max-width: 1100px){
        margin-left: ${SPACING.large}px;
        margin-right: ${SPACING.large}px;
    }
    @media screen and (max-width: 700px){
        margin-left: 0px;
        margin-right: 0px;
    }
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
    display: block;
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