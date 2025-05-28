import styled from 'styled-components';
import { Container, SideBarLeft, SideBarRight } from '../../styles/globalStyles';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MessageAppContainer = styled.div`
    width: 100%;
    padding-top:${SPACING.medium}px; 
    padding-bottom:${SPACING.medium}px; 
    background-color: #12151A;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom:${SPACING.large}px; 
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
    padding-left: ${SPACING.medium}px;
`;
export const BtnClose = styled.div`
    border-radius: 30px;
    background-color: ${({ theme }) => theme.container.color};
    cursor: pointer;
    height:40px;
    width:40px;
    align-items: center;
    justify-content: center;
`;