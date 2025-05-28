import styled from 'styled-components';
import { Container, SideBarLeft, SideBarRight } from '../../styles/globalStyles';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MessageAppContainer = styled.div`
    width: 500px;
    height: auto;
    background-color: ${({ theme }) => theme.colorDark.color};
    border-radius: 10px;
    align-items: flex-start;
    flex-direction: row;
    padding-left: ${SPACING.large}px;
    padding-top: ${SPACING.small}px;
`;

export const InnerBox = styled.div`
    display: flex;
    width: 100%;
    padding-left: ${SPACING.medium}px;   
    padding-right: ${SPACING.medium}px;
    flex-direction: column;
    justify-content: flex-start;
`;

export const Text = styled.p`
    text-align: left;
    padding-left: ${SPACING.small}px;  
    padding-bottom: ${SPACING.medium}px;
`;

export const Name = styled.p`
    text-align: left;
    padding-left: ${SPACING.small}px;  
    font-family: 'LatoBlack';
`;