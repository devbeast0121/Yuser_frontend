import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


export const Alink = styled.a`
    text-decoration: none;
    opacity:0.7;

    :link {
        color:  ${({ theme }) => theme.textPrimary.color}
    }
    :visited {
        color: ${({ theme }) => theme.textPrimary.color}
    }
    :hover {
        opacity: 0.4;
        color: ${({ theme }) => theme.textPrimary.color}
    }
    :active {
        opacity: 0.4;
        color: ${({ theme }) => theme.textPrimary.color}
    }
`;

export const CardsContainer = styled.div`
    display: grid;
    width:100%;
    grid-template-columns:  repeat(3, 1fr);
    grid-column-gap: ${SPACING.large}px;
    margin-top: ${SPACING.large}px;
    margin-bottom: ${SPACING.large}px;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
    position: relative;
    z-index: 1;

    @media screen and (max-width: 991px){
        display: grid;
        grid-template-columns: 1fr;
        padding-left: ${SPACING.medium}px;
        padding-right: ${SPACING.medium}px;
    }
`;

export const ItemCard = styled.div`
    width: 100%;
    height: 470px;
    border-radius: 20px;
    background-color:  ${({ theme }) => theme.name == "light" ? COLORS.whiteLight : "#1E2431"}; 
    flex-direction: column;
    overflow: hidden;

    @media screen and (max-width: 991px){
        height: 230px;
        max-width: 600px;
        width: 100%;
        flex-direction: row;
        margin-bottom: ${SPACING.large}px;
        margin-left: auto;
        margin-right: auto;
    }

    @media screen and (max-width: 580px){
        max-width: 360px;
        width: 100%;
        height: 470px;
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
   background-color:  ${({ theme }) => theme.name == "light" ? COLORS.whiteMedium : "#2A354D"}; 
`;
export const BoxBottom = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
  // align-items: flex-start;
    justify-content: center;
    margin-left: ${SPACING.large}px;
`;

export const Title = styled.p`
    font-size: 33px;
    font-family: 'LatoBlack';
    text-shadow: 0px 1px, 1px 0px, 1px 0px;
    margin-bottom: ${SPACING.large}px;
`;

export const BulletItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: ${SPACING.small}px;
`;

export const Bullet = styled.div`
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.name == "light" ? COLORS.blackDarkMedium : COLORS.white}; 
    align-items: flex-start;
    justify-content: flex-start;
    margin-right: ${SPACING.small}px;
`;

export const ButtonMore = styled.div`
    width: 20%;
    height: 40px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.purple};
    margin-top: ${SPACING.large}px;
    margin-bottom: ${SPACING.extraLarge}px;
    cursor: pointer;
    align-self: center;

    @media screen and (max-width: 991px){
        width: 150px;
    }
`;

export const BtnText = styled.p`
    color: ${({ theme }) => theme.textPrimary.color};
    font-family: "LatoBlack";
`;