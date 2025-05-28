
import styled from 'styled-components';
import { Container, SideBarLeft, SideBarRight } from '../../styles/globalStyles';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


export const Name = styled.p`
    line-height: 1;
    font-family: "LatoBlack";
    font-size:15px;
    opacity:0.6;
    // margin-left: ${SPACING.large}px;
    // margin-right: ${SPACING.large}px;
`;

export const Comment = styled.p`
    margin-left: ${SPACING.small}px;
    font-size:15px;
    opacity:0.6;
`;

export const ReplyContainer = styled.div`
    flex-direction: row;
    margin-left:${SPACING.small}px;
    margin-top:${SPACING.small}px;
    align-items:flex-start;
    justify-content:flex-start;
`;

export const MainContainer = styled.div`
`;