import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const BtnOnboarding = styled.div`
    background-color: ${props => props.ethereumWalletVisible ? 'transparent' : COLORS.blue};
    border: solid ${({ theme }) => theme.borderColor.color};
    border-width: ${props => props.ethereumWalletVisible ? 3 : 0}px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position:relative;
    width:100%;
    padding:8px 16px;
    cursor: pointer;
    box-shadow:0 1px 16px rgba(0,0,0,0.3);
`;

export const BtnText = styled.p`
    font-family: 'LatoBlack';
    margin-left:${SPACING.small}px;
    font-size:16px;
    color:#fff;
`;