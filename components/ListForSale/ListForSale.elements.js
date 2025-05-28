////import { SP } from 'next/dist/next-server/lib/utils';
import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const OverlayContainer = styled.div`
    flex-direction: column;
    width: 670px;
    background: ${({ theme }) => theme.colorGrey.color};
    padding-top: ${SPACING.large}px;
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

export const FormatSubBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: flex-start;
`;

export const SubBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:  ${props => props.between ? 'space-between' : 'flex-start'};
    padding-bottom: ${SPACING.medium}px;
    @media screen and (max-width: 480px){
        flex-direction: ${props => props.small ? 'row' : 'column'};
        align-items: flex-start;
    }
`;

export const PriceInputBox = styled.div`
    height: 80px;
	width: 100%;
	flex-direction: column;
	background-color: ${({ theme }) => theme.colorGrey.color};
	border-style: solid;
    border-radius: 5px;
    border-color: ${props => props.selected ? COLORS.blue : "#2f3d57"} ; 
    border-width: ${props => props.selected ? '3px' : "1px"} ;
    align-items: center;
    justify-content: center;
    opacity: ${props => props.selected ? '100%' : "15%"}; 
    

    @media screen and (max-width: 480px){
        align-self : flex-start;
        margin-left: 0px;
        margin-bottom: ${SPACING.large}px;
    }
`;

export const PriceInput = styled.input`
	display: flex;
    width: 100%;
	text-align: right;
	background-color: transparent;
	outline: none;
    border-style: ${props => props.priceError ? 'solid' : 'none'};
    border-color: ${props => props.priceError ? COLORS.red : null};
    border-width: ${props => props.priceError ? '1px' : '0px'};
	caret-color: ${({ theme }) => theme.placeholder.color} !important;
    color:  ${({ theme }) => theme.textSecondary.color};
    padding-right: ${SPACING.medium}px;
    
    &::placeholder {
        color: ${({ theme }) => theme.placeholder.color};
    }
`;

export const DateTimeBox = styled.div`
    height: 60px;
	display: flex;
    flex-wrap: wrap;
	background-color: ${({ theme }) => theme.colorGrey.color};
	border-style: solid;
    border-radius: 5px;
    border-color:  ${({ theme }) => theme.borderColor.color};
    border-width: 1px;
    margin-left: auto;
    justify-content: flex-end;
    align-items: center;
    padding-right: ${SPACING.small}px;
    padding-left: ${SPACING.small}px;

   @media screen and (max-width: 480px){
        align-self : flex-start;
        margin-left: 0px;
        margin-bottom: ${SPACING.large}px;
    }
`;

export const IconWrap = styled.div`
    height: 100%;
    width: 60px;
    background-color: ${({ theme }) => theme.colorMediumDark.color};
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    padding-left: ${SPACING.medium}px;
    padding-right: ${SPACING.medium}px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    width: 20%;
    flex-direction: column;
    align-self: flex-end;
    margin-top: ${SPACING.large}px;
    margin-bottom: ${SPACING.large}px;

    @media screen and (max-width: 680px){
        width: 40%;
    }

    @media screen and (max-width: 480px){
        width: 60%;
    }
`;
export const BidContainer = styled.div`
    flex-direction: column;
    background-color: ${({ theme }) => theme.colorGrey.color};
    border-radius:10px;
    padding: ${SPACING.large}px;
`;

export const TxtCurrentBid = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    font-family: ${props => props.titleTxt ? 'LatoBlack' : 'LatoRegular'};
    color: ${props => props.theme.name == "light" && props.titleTxt ? COLORS.black :
                                    props.theme.name == "light" && !props.titleTxt ? COLORS.greyMedium :
                                        props.theme.name == "dark" && props.titleTxt ? COLORS.white : COLORS.whiteLight}; 
`;

export const ButtonContainer = styled.div`
    color:  #ccc;
    display: flex;
    flex-direction: row;
`;
export const PriceInputIIcon = styled.div`
    height: 60px;
	width: 175px;
	flex-direction: row;
	background-color: ${({ theme }) => theme.colorGrey.color};
	border-style: solid;
    border-radius: 5px;
    border-color:${({ theme }) => theme.borderColor.color};
    border-width: 1px;
    margin-left: auto;

    @media screen and (max-width: 480px){
        align-self : flex-start;
        margin-left: 0px;
        margin-bottom: ${SPACING.large}px;
    }
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
    padding-left: ${SPACING.extraLarge}px;
    padding-right: ${SPACING.extraLarge}px;
    
    @media screen and (max-width: 480px){
      //  padding-left: ${SPACING.medium}px;
      //  padding-right: ${SPACING.medium}px; 
    }      
`;