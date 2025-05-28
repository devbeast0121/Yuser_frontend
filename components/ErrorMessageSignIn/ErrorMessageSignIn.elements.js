import styled from 'styled-components';
import { Container, SideBarLeft, SideBarRight } from '../../styles/globalStyles';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MessageAppContainer = styled.div`
    width: 100%;
    max-width:700px;
    height: 60px;
    background-color: ${props => props.containerColor};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const InnerBox = styled.div`
    display: flex;
    flex: 1;
    padding-left: ${SPACING.large}px;   
    padding-right: ${SPACING.large}px;
    flex-direction: row;
    align-items: center;
`;

export const Text = styled.p`
    text-align: left;
    padding-left: ${SPACING.large}px;
`;
