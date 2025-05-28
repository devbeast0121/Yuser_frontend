import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const SearchListContainer = styled.div`
    position: fixed;
    z-index: 9999;
    top: 70px;
    left: 33%;
    width: 600px;
    display: flex;
    flex-direction: column;
    background-color: ${COLORS.red};
`;

export const ResultContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: ${SPACING.large}px;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
`;

export const Content = styled.p`
    line-height: 1.6;
    margin-left: ${SPACING.large}px;;
`

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