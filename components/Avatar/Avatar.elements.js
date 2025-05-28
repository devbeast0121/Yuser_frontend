import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const AvatarContainer = styled.div`
    border-style: ${props => props.frame ? 'solid' : 'none'} !important; 
    border-width: ${props => props.frame && props.size === 'small' ? 2 : props => props.frame ? 3 : 0}px;
    border-color: ${props => props.nft ? '#F7F619' : props.frame ? COLORS.White : COLORS.White};  //replaced '#ffffff80' -> Colors.White
    border-radius:  50%;
    width: ${props => props.size === 'large' ? 96 : props.size == 'medium' ? 46 : props.size == 'small' ? 29 : 29}px;
    height: ${props => props.size === 'large' ? 96 : props.size == 'medium' ? 46 : props.size == 'small' ? 29 : 29}px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor:  pointer
    overflow: visible;
    flex-shrink: 0;
`;

export const AvatarInner = styled.div`
    border-radius: 50%; 
    height: ${props => props.size === 'large' ? 90 : props.size == 'medium' ? 40 : props.size == 'small' ? 25 : 25}px;
    width:   ${props => props.size === 'large' ? 90 : props.size == 'medium' ? 40 : props.size == 'small' ? 25 : 25}px;
    text-align: center;
    overflow: hidden;
`;

export const AvatarImg = styled.img`
    height: 100%;
    width: 100%;
`;

export const BtnAvatarEdit = styled.div`
    height: 14px;
    width: 14px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    margin: auto;
    background-color: ${COLORS.purple};
    position: absolute;
    z-index: 999;
    top: 32px;
`;

export const CreatorIcon = styled.div`
    position: absolute;
    right:  0; 
    bottom:  0;
    height: ${props => props.size === 'large' ? 30 : props.size == 'medium' ? 16 : props.size == 'small' ? 10 : 10}px; 
    width: ${props => props.size === 'large' ? 30 : props.size == 'medium' ? 16 : props.size == 'small' ? 10 : 10}px;
    border-radius: 50%; 
    background-color: ${COLORS.purple};
    justify-content: center;
    align-items: center;
`;

export const NewChat = styled.div`
    position: absolute;
    right:  0; 
    bottom:  0;
    height: ${props => props.size === 'large' ? 30 : props.size == 'medium' ? 16 : props.size == 'small' ? 10 : 10}px; 
    width: ${props => props.size === 'large' ? 30 : props.size == 'medium' ? 16 : props.size == 'small' ? 10 : 10}px;
    border-radius: 50%; 
    background-color: ${COLORS.red};
    justify-content: center;
    align-items: center;
`;
