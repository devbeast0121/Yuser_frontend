import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const BadgeContainer = styled.div`
    position: absolute;
    height: 20px;
    width: 20px;
    z-index: 9999;
    top: ${props => props.position == 'web' ? 8 : 6}px;
    left: ${props => props.position == 'web' ? 30 : 30}px;
    border-radius: 50%;
    background-color: ${COLORS.red};
    justify-content:center;
    align-items: center;
    overflow: visible;
    border-width:1px;
    border-style:solid;
    border-color:${({ theme }) => theme.borderColor.color};
`;

export const Number = styled.p`
    font-size: 10px;
    text-align: center;
    font-family: 'LatoBlack';
    color: ${COLORS.white}
`;