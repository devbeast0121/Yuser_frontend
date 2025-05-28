import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const ButtonContainer = styled.button`
    height:  ${props => props.size === 'small' ? 30 : 40}px;
    width: ${props => props.followed === true ? 50 : props.size === 'small' ? 80 : 150}px;
    background-color: ${props => props.followed === true ? COLORS.purple : COLORS.purple};
    border-width: ${props => props.border === true ? 1 : 0};
    border-color: ${props => props.border === true ? props.theme.borderColor.color : null};
    border-style: ${props => props.border === true ? 'solid' : null};
    flex:1;
    border-radius: 5px;
    display: ${props => props.btnText=="" ? 'none' : 'flex'};
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
`;

export const IconContainer = styled.div`
    align-items: center;
    justify-content: center;
    width: ${props => props.followed === true ? 50 : 0}px;
`;

export const TextContainer = styled.p`
    font-size: ${props => props.size === 'small' ? FONT_SIZE.small : FONT_SIZE.medium}px;
    text-align: center;
    font-family: 'LatoBlack';
    color: ${COLORS.white};
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
    //width: ${props => props.followed === true ? 0 :  props.size === 'small' ? 80 : 150}px;
`;