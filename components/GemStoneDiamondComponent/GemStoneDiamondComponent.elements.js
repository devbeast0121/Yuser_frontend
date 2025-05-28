import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: 34.51% 35.55% 29.34%;
    margin: ${SPACING.large}px;
    z-index: 1;

    @media screen and (max-width: 991px){
        grid-template-columns: 1fr;
        margin-left: ${SPACING.medium}px;
        margin-right: ${SPACING.medium}px;
    }
`;

export const CardWrapper = styled.div`
    flex-direction: row;
    align-items:center;
    justify-content: center;

    ::after {
        background-image: url(${props => props.arrow});
        background-repeat: no-repeat;
        background-size: contain;
        display: block;
        content:  ' ';
        background-size: 40px unset;
        height: 40px;
        width: unset;
        padding: ${SPACING.large}px;
        align-self: flex-end;
        padding-top: 320px;
    }

    @media screen and (max-width: 991px){
        flex-direction: column;
        justify-content:center;
        align-items: center;
        
        ::after {
            padding: ${SPACING.large}px;
            align-self: flex-end;
            margin-right: 70%;
            padding-top: 0px;

            -webkit-transform: rotate(90deg);
            -moz-transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            -o-transform: rotate(90deg);
            transform: rotate(90deg);
        }

        @media screen and (max-width: 580px){
            ::after {
            margin-right: 47%; 
            }
        }
    }
`;

export const ItemCard = styled.div`
    width: 100%;
    height: 470px;
    border-radius: 20px;
    background-color:  ${({ theme }) => theme.name == "light" ? COLORS.whiteLight : "#1E2431"}; 
    flex-direction: column;
    overflow: hidden;
    margin-top: ${SPACING.medium}px;
    margin-right: ${props => props.lastCard ? 0 : SPACING.medium}px;
    margin-bottom: ${SPACING.medium}px;
    margin-left: ${SPACING.medium}px;


    @media screen and (max-width: 991px){
        max-height: 230px;
        max-width: 600px;
        width: 100%;
        flex-direction: row;
        justify-content:center;
        margin-left: ${props => props.lastCard ? 0 : SPACING.medium}px;
    }

    @media screen and (max-width: 580px){
        max-width: 360px;
        width: 100%;
        max-height: 470px;
        border-radius: 20px;
        background-color: ${({ theme }) => theme.colorGrey.color};
        flex-direction: column;
        overflow: hidden;
    }
`;

export const BoxTop = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   border: 2px solid ${props => props.theme.borderColor.color};
`;
export const BoxBottom = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
    background-color:  ${({ theme }) => theme.name == "light" ? COLORS.whiteMedium : "#2A354D"}; 
`;

export const Title = styled.p`
    font-size: 33px;
    font-family: 'LatoBlack';
    text-shadow: 0px 1px, 1px 0px, 1px 0px;
    margin-bottom: ${SPACING.large}px;
`;

export const Item = styled.p`
    text-align: left;
    padding-bottom: ${SPACING.large}px;
`;
