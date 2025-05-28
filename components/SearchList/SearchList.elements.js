import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const SearchListContainer = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
`;

export const ResultContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: ${SPACING.large}px;
`;

export const Content = styled.p`
    line-height: 1.6;
    margin-left: ${SPACING.large}px;;
`
