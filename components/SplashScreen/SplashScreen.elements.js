import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const SplashScreenContainer = styled.div`
    max-width: 1100px;
    max-height: 625px;
    height:100%;
    width: 100%;
    padding:${SPACING.medium}px;
`;

export const LeftBox = styled.div`
    display: flex;
    flex: 1;
    position: relative;
`;

export const RightBox = styled.div`
    display: flex;
    flex: 1;
    background-color: #101721;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const LoginContainer = styled.div`
    display: flex;
    width: 70%;
    flex-direction: column;
    justify-content: center;
    //align-items: center;
`;

export const Background = styled.div`
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
`;
export const BackgroundBody = styled.div`
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    flex-direction: column;
    padding: ${SPACING.extraLarge}px;
    justify-content: center;
    width: 70%;
    @media screen and (max-width: 991px){
        width:100%;
        padding:${SPACING.medium}px;
    }
`;

export const TxtSmall = styled.p`
   font-size: ${FONT_SIZE.small}px;
   color: ${({ theme }) => theme.textSecondary.color};
   line-height: 1.2;
   position:absolute;
   bottom:${SPACING.large}px;
`;

export const TxtTitle = styled.p`
    font-size: 55px;
    font-family: 'LatoBlack';
    margin-bottom: 12px;
    line-height: 1;
`;

export const TxtMain = styled.p`
    margin-bottom: 40px;
    font-size: 20px;
    line-height: 1.3;
`;

export const TxtLogin = styled.p`
   font-size: ${FONT_SIZE.large}px;
   text-align: center;
`;

export const BoxBottons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: ${SPACING.large}px;
`;

export const ForButton = styled.div`
    height: 50px;
    width: 150px;
    position: relative;
`;

export const Opaque = styled.div`
    background-color:#0e19297a;
    position:absolute;
    right:0;
    left:0;
    bottom:0;
    top:0;
`;