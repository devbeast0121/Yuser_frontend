import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const GiftBarContainer = styled.div`
    width:  ${props => props.position === 'horizontal' ? 'auto' : '70px'};
    display: flex;
    flex-direction: ${props => props.position === 'horizontal' ? 'row' : 'column-reverse'};
    align-items: ${props => props.position === 'horizontal' ? 'center' : 'flex-end'} ;
    justify-content: ${props => props.position === 'horizontal' ? 'space-around' : null} ;
    background-color:  ${props => props.theme.name == "light"?  COLORS.whiteLight : COLORS.black};
    padding-top: ${props => props.position === 'horizontal' ? 13 : 10}px;
    padding-bottom: ${props => props.position === 'horizontal' ? 13 : 10}px;
    padding-left:${props => props.position === 'horizontal' ? 12 : 0}px;
    padding-right:${props => props.position === 'horizontal' ? 12 : 0}px;
    align-items:center;
    border-radius: 10px;
`;

export const BtnGiftBar = styled.div`
    justify-content: center;
    align-items:center;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    padding-top: ${props => props.position === 'horizontal' ? 0 : 5}px;
    padding-bottom: ${props => props.position === 'horizontal' ? 0 : 5}px;
    margin-right: ${props => props.position === 'horizontal' ? 9 : 0}px;
    margin-left: ${props => props.position === 'horizontal' ? 9 : 0}px;
`;

export const BtnText = styled.p`    
    text-align: center ;
    padding-top: 4px;
    font-size: ${FONT_SIZE.extraSmall}px;
    font-family: 'LatoBlack';
    color: ${props => props.theme.name == "light"?  COLORS.greyMedium : COLORS.white};
`; 