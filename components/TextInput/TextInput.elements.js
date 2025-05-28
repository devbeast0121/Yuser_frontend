import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MainContainer = styled.div`
    display: flex;
    flex: 1;
   // background-color: coral;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const TextInputContainer = styled.div`
    width: 100%;
    position: sticky;
    bottom: 0;
    left:0;
    right:0;
    z-index: 999;
    display: flex;
    background-color: ${props => props.replyDataIsReply ? '#3f485c' : '#181d2a'};
    //opacity: ${props => props.replyDataIsReply ? 0.4 : 1};
    border-top:1px solid ${({ theme }) => theme.borderColor.color};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;

export const TextInputBox = styled.input`
    height: 70px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    background-color: transparent;
    margin-left: ${SPACING.large}px;
    border: none;
    outline: none;
    caret-color: ${({ theme }) => theme.placeholder.color} !important;
    color:  ${({ theme }) => theme.textSecondary.color};
    
    &::placeholder {
        color: ${({ theme }) => theme.placeholder.color};
    }
`;

export const IconBox = styled.div`
   display: flex;
`;

export const UserSuggestionsModal = styled.div`
    position: absolute;
    background-color: ${({ theme }) => theme.container.color};
    flex-direction:column;
    bottom:70px;
    width: 100%;
    justify-content:center;
    overflow: scroll;
    flex-shrink: 0;
    z-index: 99999;
    height: 400px;
    padding-top: 24px;
    padding-bottom: 12px;
`;

export const EachUserSuggestion = styled.div`
    color:${({ theme }) => theme.textPrimary.color};
    color: #dddfe2;
    height: 60px;
    flex-shrink: 0;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const UserNameText = styled.div`
`;

export const ReplyBox = styled.div`
    width: 100%;
    position: sticky;
    bottom: 60px;
    left: 0;
    right: 0;
    z-Index: 99999;
    display: flex;
    background-color: ${({ theme }) => theme.colorGrey.color};
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
`;