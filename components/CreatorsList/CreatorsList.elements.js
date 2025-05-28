import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


export const CreatorsListContainer = styled.div` 
    flex: 1;
    flex-direction: column;
    margin-bottom: ${SPACING.large}px;
`;

export const CreatorBox = styled.div` 
    flex-direction: row;
    justify-content: flex-start;
    align-items: center; 
    padding-top: ${SPACING.medium}px;
    padding-bottom: ${SPACING.medium}px;
`;

export const TxtLarge = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    font-family: 'LatoBlack';
    text-align: left;
    padding-left: ${SPACING.medium}px;
    cursor: pointer;

    @media screen and (max-width: 991px){
        display: none;
    }
`;

export const TxtTitle = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    font-family: 'LatoBlack';
    text-align: left;

    @media screen and (max-width: 991px){
        font-size: ${FONT_SIZE.extraSmall}px;
    }
`;

export const Line = styled.div` 
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colorGrey.color};
    align-self: center; 

    @media screen and (max-width: 991px){
        width: 70%;
        align-self: flex-start;
    }
`;

export const Stats = styled.div` 
    flex-direction: column;
`;