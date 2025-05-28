import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MainContainer = styled.div`
    position: relative;
    z-index: 9999;
    display: flex;
    flex: 1;
    flex-direction: column;
   // background-color: ${props => props.textInputFocused ? '#2a303e' : '#181d2a'};
`;

export const TextInputContainer = styled.div`
    background-color: ${props => props.theme.name == "light" && props.textInputFocused ? COLORS.white :
                                    props.theme.name == "light" && !props.textInputFocused ? COLORS.whiteMedium :
                                        props.theme.name == "dark" && props.textInputFocused ? '#2a303e' : '#181d2a'};
    border-top:1px solid  ${({ theme }) => theme.name == "light" ? COLORS.whiteLight : COLORS.blackDark};
    border-top:1px solid ${({ theme }) => theme.borderColor.color};
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
`;

export const ReplyBox = styled.div`
    width: 100%;
    position: sticky;
    bottom: 60px;
    left: 0;
    right: 0;
    z-Index: 99;
    display: flex;
    background-color: ${({ theme }) => theme.name == "light" ? COLORS.whiteMedium : COLORS.blackDarkMedium};
    border-top: 1px solid  ${({ theme }) => theme.colorGrey.color};
    flex-direction: row;
    align-items: center;
    padding:4px 0;
`;

export const BtnCancel = styled.div`
    cursor: pointer;
    padding-left: ${SPACING.small}px;
`;

export const TxtReply = styled.div`
    font-family: 'LatoBlack';
    font-size: ${FONT_SIZE.small}px;
    padding-top: ${SPACING.small}px;
    padding-bottom: ${SPACING.small}px;
`;


export const MessageInputBox = styled.textarea`
    flex: 1;
    height: 58px;
    line-height: 1.2;
	background-color: ${props => props.theme.name == "light" && props.textInputFocused ? COLORS.white :
        props.theme.name == "light" && !props.textInputFocused ? COLORS.whiteMedium :
            props.theme.name == "dark" && props.textInputFocused ? '#2a303e' : '#181d2a'};
    border-top:1px solid  ${({ theme }) => theme.name == "light" ? COLORS.whiteLight : COLORS.blackDark};
    border: none;
    outline: none;
    resize: none;
    overflow: auto;
    padding-left: 18px; 
    padding-top: 18px;
    padding-bottom: 18px;
    caret-color: ${({ theme }) => theme.placeholder.color} !important;
    color:  ${({ theme }) => theme.textSecondary.color};
    
    ::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
        display: none;
    }

    &::placeholder {
        color:  ${({ theme }) => theme.placeholder.color};
    }
`;

export const GifButton = styled.button`
  background-color:transparent;
  outline:none;
  border: none;
  display: flex;
  cursor: pointer;
  margin-left: ${SPACING.medium}px;
  margin-right: ${SPACING.medium}px;
`;

export const PickerWrapper = styled.div`
    position: absolute;
    z-index: 999999;
    bottom: ${props => props.mainContainerHeight}px;
`;

export const SendButton = styled.div`
    display: flex;
    max-width: 120px;
    min-width: 70px; 
    height: 30px;
    margin-right: ${SPACING.medium}px;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    color: ${COLORS.white};
    border-radius: 5px;
    opacity:  ${props => props.commentDraft !== "" ? 1 : 0.4};
    background-color: ${COLORS.blue};
    cursor:${props => props.commentDraft !== "" ? "pointer" : "default"};

    @media screen and (max-width: 340px){
        margin-left: 8px;
    }
`;