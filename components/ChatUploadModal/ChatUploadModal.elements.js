
import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


export const BtnClose = styled.div`
    border-radius: 30px;
    background-color: ${COLORS.black};
    position: absolute;
    z-index: 999;
    top: ${SPACING.large}px;
    left: ${SPACING.large}px;
    cursor: pointer;
    height:40px;
    width:40px;
    align-items: center;
    justify-content: center;
`;