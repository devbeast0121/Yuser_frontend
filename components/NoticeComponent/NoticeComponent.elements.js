import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const NoticeContainer = styled.div`
    display: flex;
    height: 500px;
    flex-direction:column;
    margin-top:${SPACING.large}px;
    margin-left:${SPACING.large}px;
    margin-right:${SPACING.large}px;
    background-color: ${({ theme }) => theme.colorDark.color};
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const FirstLine = styled.p`
    font-size: 25px;
    font-family: 'LatoBlack';
    line-height: 50px;
`;

export const SecondLine = styled.p`
    font-size: 20px;
    font-family: 'LatoRegular';
    text-align: center;
`;