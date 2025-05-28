import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const SignupBoxContainer = styled.div`
    display: flex;
    background-color: ${COLORS.blackDark};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: ${SPACING.large}px;
    padding: 0;
    border-radius:10px;
    position:relative;
    overflow:hidden;
    flex-shrink:0;
    cursor: pointer;

    @media screen and (max-width: 991px){
        display: none;
    }
`;

export const SignupTitle = styled.p`
    text-align: center;
    font-size: 25px;
    font-family:'LatoBlack';
    z-index:9;
    margin-bottom:4px;
`;

export const SignupText = styled.p`
    text-align: center;
    font-size:25px;
    word-wrap: break-word;
    font-family:'LatoLight';
    z-index:9;
`;

export const LogoSplash = styled.div`
    z-index:9;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const BackgroundImage = styled.div`
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    z-index:0;
    opacity:0.7;
`;

export const InviteCodeContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    border-radius: 10px;
`;

export const CopyButton = styled.div`
    height: 50px;
    width: 100%;
    background-color: ${COLORS.purple};
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    cursor:pointer;
    margin-top: ${SPACING.medium}px;
`;

export const InviteHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
`;

export const SectionBox = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-left: ${SPACING.medium}px;
`;

export const IconWrapper = styled.div`
    height: 76px;
    width: 76px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
`;

export const HeaderTitleText = styled.p`
    font-size:20px;
    font-weight:900;
`;

export const HeaderBodyText = styled.p`
    font-size:15px;
    color:${({theme})=> theme.textSecondary.color}
`;

export const SignupModalOverlay = styled.div`
    position:fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    z-index:99999999999;
    justify-content:center;
    align-items:center;
    background:COLORS.black50;
    

`;

export const SignupModalContainer = styled.div`
    flex-direction: column;
    width: 379px;
    height:592px;
    background: #0B1731;
    padding-top: ${SPACING.large}px;
    padding-bottom: ${SPACING.large}px;
    border-radius: 15px;
    position:relative;  
    flex-direction:column;
    margin:${SPACING.large}px;
    justify-content:space-evenly;
    align-items:center;

    @media screen and (max-width: 700px){
        width: 400px;
    }
    @media screen and (max-width: 480px){
       margin-left: 0px;
       margin-right: 0px;
    
    }
`;
export const TitleOverlay = styled.p`
    font-family: 'Rubik', 'LatoBlack', sans-serif;
    line-height: 1;
    font-size: calc(${props => props.fontSize}px + 1 * ((100vw - 320px) / 680));
    //margin-bottom: ${SPACING.large}px;
    @media screen and (max-width: 1000px){
        font-size: calc( ${props => props.fontSize}px - 5px );
        margin-bottom:12px;
    }
    @media screen and (max-width: 750px){
        font-size: calc( ${props => props.fontSize}px - 10px );
        margin-bottom:12px;
    }
`;

export const ImageBox = styled.div` 
    margin: ${SPACING.large}px;
    width:75%;
    height:75%
    flex:1;
    @media screen and (max-width: 850px){
        margin-top: ${props => props.reverse && props.mobileReverse ? 0 : props.mobileReverse ? SPACING.large : props.reverse ? SPACING.large : 0}px;
        order: ${props => props.mobileReverse && props.reverse ? 1 : props.reverse ? 2 : 1};
    }
`;

export const ItemImage = styled.img`
    max-height: 100%;
    max-width: 100%;
    @media screen and (max-width: 750px){
        margin-bottom: ${SPACING.medium}px;
        margin-bottom: ${props => props.mobileMargin ? SPACING.medium : 0}px
    }
`

export const StoreImage = styled.img`
    max-width:50%;
    max-height:50px;
    margin-right:12px;
    @media screen and (max-width: 600px){
       
    }
`
export const StoreDiv = styled.div`
   flex-direction:row;
   justify-content:space-between;
   margin-top: ${SPACING.large}px;
`
export const FooterText = styled.p`
    font-family: latoBlack;
    color:${({theme})=>theme.textSecondary.color};
    font-size:12px;
    text-align:center;
    margin-top:6px;
`;