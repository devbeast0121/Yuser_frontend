import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


export const OverlayContainer = styled.div`
    flex-direction: column;
    width: 670px;
    background: ${({ theme }) => theme.colorGrey.color};
    padding-top: ${SPACING.large}px;
    padding-bottom: ${SPACING.large}px;
    border-radius: 15px;
    position:relative;  

    @media screen and (max-width: 700px){
        width: 400px;
    }

    @media screen and (max-width: 480px){
       margin-left: 0px;
       margin-right: 0px;
    
    }
`;

export const PriceInput = styled.input`
	display: flex;
    width: 100%;
	text-align: left;
	background-color: transparent;
	outline: none;
    border-style: ${props=>props.priceError ? 'solid':'none'};
    border-color: ${props=>props.priceError? COLORS.red:null};
    border-width: ${props=>props.priceError? '1px':'0px'};
	caret-color: ${({ theme }) => theme.placeholder.color} !important;
    padding-left: ${SPACING.medium}px;
    color:  ${({ theme }) => theme.textSecondary.color};
    
    &::placeholder {
        color: ${({ theme }) => theme.placeholder.color};
    }
`;

export const IconWrap = styled.div`
    height: 100%;
    width: 120px;
    background-color: ${({ theme }) => theme.colorMediumDark.color};
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    padding-left: ${SPACING.medium}px;
    padding-right: ${SPACING.medium}px;
    padding-top: ${SPACING.small}px;
    padding-bottom: ${SPACING.small}px;
    justify-content: center;
    align-items: center;
`;


export const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    margin-top: ${SPACING.large}px;
    margin-bottom: ${SPACING.medium}px;
`;
export const BidContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colorGrey.color};
    border-radius: 10px;
    padding: ${SPACING.large}px;
`;

export const TxtCurrentBid = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    font-family: 'LatoRegular';
    color: ${props => props.theme.name == "light" && props.titleTxt ? COLORS.black :
                                    props.theme.name == "light" && !props.titleTxt ? COLORS.greyMedium :
                                        props.theme.name == "dark" && props.titleTxt ? COLORS.white : COLORS.whiteLight};
    text-align: center;
`;


export const ButtonContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
`;
export const PriceInputIIcon = styled.div`
    display: flex;
    flex: 1;
    height: 60px;
	flex-direction: row;
	background-color: ${({ theme }) => theme.colorGrey.color};
	border-style: solid;
    border-radius: 5px;
    border-color:${({ theme }) => theme.borderColor.color};
    border-width: 1px;
    justify-content:flex-start;
    margin: ${SPACING.large}px;
    

    @media screen and (max-width: 480px){
        align-self : flex-start;
        margin-left: 0px;
        margin-bottom: ${SPACING.large}px;
    }
`;
export const TextWMOVR = styled.div`
    font-size: ${FONT_SIZE.small}px;
    font-family: 'LatoBlack';
    text-align: center;
    padding-left: ${SPACING.small}px;
`;

export const TopContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px; 

    @media screen and (max-width: 480px){
      //  padding-left: ${SPACING.medium}px;
       // padding-right: ${SPACING.medium}px; 
    }     
`;

export const TxtBid = styled.p`
    font-size: ${FONT_SIZE.extraLarge}px;
    padding-left: ${SPACING.large}px;
    padding-top: ${SPACING.small}px;
    font-family: 'LatoBlack';
    text-align: left;
`;

export const BottomContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    border-top-color: ${({ theme }) => theme.borderColor.color};
    border-top-style: solid;
    border-top-width: 1px;
    margin-top: ${SPACING.medium}px;
    padding-left: ${SPACING.extraLarge}px;
    padding-right: ${SPACING.extraLarge}px;
    
    @media screen and (max-width: 480px){
      //  padding-left: ${SPACING.medium}px;
      //  padding-right: ${SPACING.medium}px; 
    }      
`;

export const TxtCurrentBidSmall = styled.div`
    font-size: ${FONT_SIZE.extraSmall}px;
    ${'' /* font-family: 'LatoBlack'; */}
    text-align: center;
    
`;