import styled from 'styled-components';
import { COLORS, SPACING } from '../../styles/Styling.js';


export const UserSuggestionsModal = styled.div`
    position: absolute;
    flex-direction:column;
    bottom: ${props => props.uploadingScreen ? "null" : props.mainContainerHeight+"px"};
    top: ${props => props.uploadingScreen ? "145px" : "null"};
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden ;
    flex-shrink: 0;
    z-index: 99999;
    max-height: ${props => props.uploadingScreen ? 200 : 400}px;
    padding-top: ${SPACING.medium}px;
    padding-bottom: ${SPACING.medium}px;
    background-color:  ${({ theme }) => theme.colorMedium.color};
    //border-bottom: 2px solid ${({ theme }) => theme.borderColor.color};
    border: 2px solid ${({ theme }) => theme.borderColor.color};
    border-radius: 5px;

    ::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
        display: none;
    }
`;

export const EachUserSuggestion = styled.div`
    display: flex;
    color:${({ theme }) => theme.textSecondary.color};
    height: 60px;
    flex-shrink: 0;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    inline-size: min-content;
`;

export const UserNameText = styled.div`
`;

