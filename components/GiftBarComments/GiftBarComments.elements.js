import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const GiftBarContainer = styled.div`
    height: 250px;
    width:  50px;
    display: flex;
    flex-direction: column;
    align-items: center ;
    justify-content: center;
    background-color:  ${props => props.theme.name == "light"?  COLORS.whiteLight : COLORS.black};
    padding-top: ${SPACING.medium}px;
    padding-bottom: ${SPACING.medium}px;
    border-radius: 5px;
    position: absolute;
    z-index: 99999;
`;

export const BtnGiftBar = styled.div`
    justify-content: center;
    align-items:center;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    z-index: 99999;
    padding-top: 3px;
`;

export const BtnText = styled.p`    
    text-align: center ;
    padding-bottom: ${SPACING.small}px;
    font-size: ${FONT_SIZE.extraSmall}px;
    font-family: 'LatoBlack';
    color: ${props => props.theme.name == "light"?  COLORS.greyMedium : COLORS.white};
`;