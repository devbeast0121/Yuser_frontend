import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MarketPostsContainer = styled.div`
    display: grid;
    grid-template-columns:  repeat(4, 1fr);
    grid-column-gap: 20px;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;

    @media screen and (max-width: 1010px){  
        display: grid;
        grid-template-columns:  repeat(2, 1fr);
    }

    /*@media screen and (max-width: 991px){  
        display: grid;
        grid-template-columns:  repeat(2, 1fr);
    }*/

    @media screen and (max-width: 600px){  
        display: grid;
        grid-template-columns:  repeat(1, 1fr);
    }
`;

export const ItemBox = styled.div`
    width: 100%; 
    flex-direction: column;
    margin-bottom: ${SPACING.large}px;
    position: relative;

    @media screen and (max-width: 1010px){
        display:none;
        :nth-of-type(1), :nth-of-type(2) {
            display:flex;
        }
    }
`;

export const BottomBox = styled.div`
    position: absolute;
    bottom: ${SPACING.small}px;
    left: ${SPACING.medium}px;
    right: ${SPACING.medium}px;
    z-index: 9;
    flex-direction: row;
    justify-content: space-between;
`;

export const ImageNFT = styled.img`
    display: flex;
    width:  100%;
	height: 100%;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;

    @media screen and (max-width: 900px){
        max-width: 650px;
        max-height: max-width;
    }
`;

export const BtnWrap = styled.div`
   background-color: transparent;
   font-family: 'LatoBlack';
   justify-content: ${props => props.positionLeft ? "flex-start" : "flex-end"};
   align-items: center;
   height: 40px;
   display: flex;
`;

export const TxtLarge = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    font-family: 'LatoBlack';
    padding-left: ${SPACING.small}px;
    color: ${COLORS.white};
`;