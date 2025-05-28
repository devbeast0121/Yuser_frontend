import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const NotificationsContainer = styled.div`
    width: 500px;
    max-height: 500px;
    position: absolute;
    top: 50px;
    right: 0px;
    z-index: 10000;
    flex-direction: column;
    margin-top: 5px;
    padding-top: ${SPACING.large}px;
    background-color: ${({ theme }) => theme.colorDark.color};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);

    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    display: block;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
    };
`;

export const ResultContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: ${SPACING.large}px;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
    z-index: 99999;
    cursor: pointer;
`;

export const Content = styled.p`  
    display:inline;
    font-size:15px;
    line-height: 1.4;
`

export const ContentBox = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    flex-direction:row;
`;

export const ActionBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Post = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 5px;
    display: ${props => props.post === null ? 'none' : 'initial'};
    cursor: pointer;
`;