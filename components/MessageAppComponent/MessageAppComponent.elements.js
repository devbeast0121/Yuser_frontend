import styled from 'styled-components';
import { Container, SideBarLeft, SideBarRight } from '../../styles/globalStyles';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MessageAppContainer = styled.div`
    max-width: 700px;
    min-width: 310px;
    width: 100%;
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

    @media screen and (max-width: 700px){
        padding-left: ${SPACING.medium}px;   
        padding-right: ${SPACING.medium}px;
    }
`;

export const Text = styled.p`
    text-align: left;
    padding-left: ${SPACING.large}px;
    color: ${COLORS.white};
`;
